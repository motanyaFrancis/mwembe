'use server'
import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";

export type MpesaType = {
    phone: string;
    name: string;
    email: string;
    amount: number;
};

export type InitiatedPaymentType = {
    id: string;
    CheckoutRequestID?: string;
    MerchantRequestID?: string;
    ResultCode?: string;
    externalReference?: string;
    reference?: string;
    state?: 'INITIATED' | 'FAILED' | 'COMPLETED';
    ResultDescription?: string;
};

export type PaidTransactionType = {
    id: string
    no: string
    notified: boolean
    reference: string
    phone: string
    paymentMode: string
    createdAt: string
    confirmationCode: string
    amount: number
    church: string
    district: string
    email: string
    name: string
    status: string
}


/* ================================
   Initiate M-Pesa Payment
================================ */
export const PostMpesa = async (data: MpesaType) => {
    let payload = {
        phone: data.phone,
        name: data.name,
        email: data.email,
        amount: data.amount
    }
    // console.log('payload: ', payload)

    if (!payload.amount || payload.amount <= 0) {
        return { errors: [{ message: "Please provide a valid amount" }] };
    }

    try {
        // console.log('Sending mutation to server...');
        const { data: response } = await client.mutate<{ initiateMpesaExpressPayment: { initiateMpesaExpress: InitiatedPaymentType } }>({
            mutation: gql`
                    mutation initiateMpesaExpressPayment($phone: String!, $name: String!, $email: String!, $amount: Decimal!) {
                    initiateMpesaExpressPayment(input: { phone: $phone, name: $name, email: $email, amount: $amount }) {
                        initiateMpesaExpress {
                        id
                        CheckoutRequestID
                        MerchantRequestID
                        ResultCode
                        externalReference
                        reference
                        ResultDescription
                        }
                    }
                    }
                `,
            variables: {
                ...payload
            },
            fetchPolicy: "no-cache",
        });
        // console.log('Server response:', response);

        if (!response) return { errors: [{ message: "Failed to initiate payment" }] };

        const result: InitiatedPaymentType = response.initiateMpesaExpressPayment.initiateMpesaExpress;
        return { result: result, errors: null };
    } catch (error: any) {
        // console.error("Mutation failed:", error);
        return { errors: [{ message: error.message }] };
    }
};

/* ================================
   Confirm Payment Status
================================ */
export const ConfirmStatus = async (checkoutRequestId: string) => {

    // console.log("🔎 ConfirmStatus called with ID:", checkoutRequestId);

    try {

        const response = await client.query<{ initiatedPayment: InitiatedPaymentType }>({
            query: gql`
                query initiatedPayment($id: ID!) {
                    initiatedPayment(id: $id) {
                        id
                        CheckoutRequestID
                        MerchantRequestID
                        ResultCode
                        externalReference
                        reference
                        state
                        ResultDescription
                    }
                }
            `,
            variables: { id: checkoutRequestId },
            fetchPolicy: "no-cache",
        });

        // console.log("📡 Full GraphQL Response:", response);

        if (!response.data) {
            console.warn("⚠️ No data returned");
            return { errors: [{ message: "Failed to confirm payment" }] };
        }

        return { result: response.data.initiatedPayment, errors: null };

    } catch (error: any) {
        return { errors: [{ message: error.message }] };

    }
};



export const FetchTransactionReceipt = async (reference: string) => {
    try {

        const response = await client.query<{
            transactions: { edges: { node: PaidTransactionType }[] }
        }>({
            query: gql`
                query TranSactions($reference: String) {
                    transactions(reference: $reference) {
                        edges {
                            node {
                                id
                                no
                                notified
                                reference
                                phone
                                paymentMode
                                createdAt
                                confirmationCode
                                amount
                                church
                                district
                                email
                                name
                                status
                            }
                        }
                    }
                }
            `,
            variables: { reference },
            fetchPolicy: "no-cache"
        });

        console.log("response:", response);

        if (!response.data) {
            return { result: null, errors: [{ message: "No data returned" }] };
        }

        const result: PaidTransactionType | null = response.data.transactions.edges?.[0]?.node ?? null;

        if (!result) {
            return { result: null, errors: [{ message: "No transaction found" }] };
        }

        // Map GraphQL error if any
        const errors = response.error ? [{ message: response.error.message }] : null;

        return { result, errors };

    } catch (error: any) {
        return { result: null, errors: [{ message: error.message }] };
    }
};