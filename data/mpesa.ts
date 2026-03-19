'use server';

import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";

/* ================================
   Types
================================ */

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
    ResultCode?: string | number;
    externalReference?: string;
    reference?: string;
    state?: 'INITIATED' | 'FAILED' | 'COMPLETED';
    ResultDescription?: string;
};

export type PaidTransactionType = {
    id: string;
    no: string;
    notified: boolean;
    reference: string;
    phone: string;
    paymentMode: string;
    createdAt: string;
    confirmationCode: string;
    amount: number;
    church: string;
    district: string;
    email: string;
    name: string;
    status: string;
};

export type InitiateNode = {
    id: string;
    CheckoutRequestID?: string;
    MerchantRequestID?: string;
    ResultCode?: number;
    ResultDescription?: string;
    state: 'INITIATED' | 'FAILED' | 'COMPLETED';
    phone?: string;
    email?: string;
    name?: string;
    reference: string;
    externalReference?: string;
    createdAt?: string;
    modifiedAt?: string;
};

export type MpesaPaymentSubscriptionType = {
    status: string;
    payment: InitiateNode;
};

export type MpesaPaymentSubscriptionVariables = {
    checkoutRequestId: string;
};

/* ================================
   Initiate M-Pesa Payment
================================ */

export const PostMpesa = async (data: MpesaType) => {
    if (!data.amount || data.amount <= 0) {
        return { errors: [{ message: "Please provide a valid amount" }] };
    }

    try {
        const { data: response } = await client.mutate<{
            initiateMpesaExpressPayment: { initiateMpesaExpress: InitiatedPaymentType }
        }>({
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
            variables: data,
            fetchPolicy: "no-cache",
        });

        if (!response) return { errors: [{ message: "Failed to initiate payment" }] };

        return { result: response.initiateMpesaExpressPayment.initiateMpesaExpress, errors: null };
    } catch (error: any) {
        return { errors: [{ message: error.message }] };
    }
};

/* ================================
   Confirm Payment Status
================================ */

export const ConfirmStatus = async (checkoutRequestId: string) => {
    try {
        const { data } = await client.query<{ initiatedPayment: InitiatedPaymentType }>({
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

        return data?.initiatedPayment
            ? { result: data.initiatedPayment, errors: null }
            : { result: null, errors: [{ message: "Payment not found" }] };
    } catch (error: any) {
        return { result: null, errors: [{ message: error.message }] };
    }
};

/* ================================
   Fetch Completed Transaction
================================ */

export const FetchTransactionReceipt = async (reference: string) => {
    
    try {
        const { data } = await client.query<{ transactions: { edges: { node: PaidTransactionType }[] } }>({
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
            fetchPolicy: "no-cache",
        });

        const result = data?.transactions.edges?.[0]?.node ?? null;

        return result
            ? { result, errors: null }
            : { result: null, errors: [{ message: "Transaction not found" }] };
    } catch (error: any) {
        return { result: null, errors: [{ message: error.message }] };
    }
};

/* ================================
   Subscribe to Payment Updates
================================ */

export const SubscribeMpesaPayment = async (checkoutRequestId: string, onUpdate: (update: MpesaPaymentSubscriptionType) => void) => {
    const SUBSCRIPTION = gql`
    subscription MpesaPaymentUpdates($checkoutRequestId: String!) {
      mpesaPaymentUpdates(checkoutRequestId: $checkoutRequestId) {
        status
        payment {
          id
          CheckoutRequestID
          MerchantRequestID
          ResultCode
          ResultDescription
          state
          phone
          email
          name
          reference
          externalReference
          createdAt
          modifiedAt
        }
      }
    }
  `;

    const observable = client.subscribe<MpesaPaymentSubscriptionType, MpesaPaymentSubscriptionVariables>({
        query: SUBSCRIPTION,
        variables: { checkoutRequestId },
    });

    const subscription = observable.subscribe({
        next({ data }) {
            if (data) onUpdate(data);
        },
        error(err) {
            console.error("Subscription error:", err);
        },
    });

    return () => subscription.unsubscribe();
};