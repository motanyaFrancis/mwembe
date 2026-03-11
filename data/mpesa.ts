'use server'

import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";

/* ================================
   Types
================================ */

export type MpesaLineType = {
    code: string;
    amount: number | string;
};

export type InitiatedPaymentType = {
    id: string;
    externalReference: string;
    reference: string;
    state: "INITIATED" | "FAILED" | "COMPLETED";
    ResultDescription: string;
};

export type MpesaType = {
    name: string;
    phone: string;
    email: string;
    district?: string;
    church?: string;
    lines?: MpesaLineType[];
    errored: boolean;
    total?: number;
    save: boolean;
};

export type PaidTransactionLineType = {
    code: string;
    amount: number;
    description: string;
    name: string;
};

export type PaidTransactionType = {
    no: string;
    name: string;
    phone: string;
    district?: string;
    church?: string;
    email: string;
    reference: string;
    externalReference: string;
    createdAt: Date;
    paymentMode: string;
    lines: PaidTransactionLineType[];
    amount: number;
};

export type PaymentType = {
    code: string;
    sequenceNo: number;
    description: string;
    name: string;
};

/* ================================
   GraphQL Response Types
================================ */

type CreateMpesaResponse = {
    initiateMpesaExpressPayment: {
        initiateMpesaExpress: InitiatedPaymentType;
    };
};

type ConfirmStatusResponse = {
    initiatedPayment: InitiatedPaymentType;
};

type PaymentTypesResponse = {
    paymentTypes: {
        edges: {
            node: PaymentType;
        }[];
    };
};

type TransactionResponse = {
    transactions: {
        edges: {
            node: any;
        }[];
    };
};

/* ================================
   Initiate M-Pesa Payment
================================ */

export const PostMpesa = async (MpesaData: MpesaType) => {
    const errorMessage =
        "Oops! It looks like there are no contributions entered. Please check and try again.";

    const lines = MpesaData.lines
        ?.filter((line) => Number(line.amount) > 0)
        .map((line) => ({
            code: line.code,
            amount: line.amount,
        }));

    if (!lines || lines.length === 0) {
        return { errors: [{ message: errorMessage }] };
    }

    const payload = {
        phone: MpesaData.phone,
        email: MpesaData.email,
        name: MpesaData.name,
        district: MpesaData.district || "",
        church: MpesaData.church || "",
        lines,
    };

    try {
        const { data } = await client.mutate<CreateMpesaResponse>({
            mutation: gql`
        mutation CreateMpesa(
          $phone: String!
          $email: String!
          $name: String!
          $lines: [InitiateLineType]!
        ) {
          initiateMpesaExpressPayment(
            input: { phone: $phone, email: $email, name: $name, lines: $lines }
          ) {
            initiateMpesaExpress {
              CheckoutRequestID
              MerchantRequestID
              ResultCode
              externalReference
              ResultDescription
              mode
              reference
              id
            }
          }
        }
      `,
            variables: payload,
            fetchPolicy: "no-cache",
            context: {
                fetchOptions: {
                    next: { revalidate: 0 },
                },
            },
        });

        if (!data) {
            return { errors: [{ message: "Failed to initiate payment" }] };
        }

        const result = data.initiateMpesaExpressPayment.initiateMpesaExpress;

        return { result, errors: null };
    } catch (error: any) {
        return { errors: [{ message: error.message }] };
    }
};

/* ================================
   Confirm Payment Status
================================ */

export const ConfirmStatus = async (reference: string) => {
    try {
        const { data } = await client.query<ConfirmStatusResponse>({
            query: gql`
        query initiatedPayment($transId: ID!) {
          initiatedPayment(id: $transId) {
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
            variables: {
                transId: reference,
            },
            fetchPolicy: "no-cache",
            context: {
                fetchOptions: {
                    next: { revalidate: 0 },
                },
            },
        });

        if (!data) {
            return { errors: [{ message: "Failed to confirm payment status" }] };
        }

        return { result: data.initiatedPayment, errors: null };
    } catch (error: any) {
        return { errors: [{ message: error.message }] };
    }
};

/* ================================
   Fetch Payment Types
================================ */

export const FetchPaymentTypes = async () => {
    try {
        const { data } = await client.query<PaymentTypesResponse>({
            query: gql`
        query PaymentTypes {
          paymentTypes(active: true) {
            edges {
              node {
                code
                id
                description
                priority
                sequenceNo
                name
              }
            }
          }
        }
      `,
            fetchPolicy: "no-cache",
            context: {
                fetchOptions: {
                    next: { revalidate: 0 },
                },
            },
        });

        if (!data) {
            return [];
        }

        const payTypes: PaymentType[] = data.paymentTypes.edges.map(
            (type) => type.node
        );

        return payTypes;
    } catch (error) {
        console.error("FetchPaymentTypes error:", error);
        return [];
    }
};

/* ================================
   Fetch Transaction Receipt
================================ */

export const FetchTransactionReceipt = async (reference: string) => {
    try {
        const { data } = await client.query<TransactionResponse>({
            query: gql`
        query Transactions($reference: String) {
          transactions(reference: $reference) {
            edges {
              node {
                id
                no
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
                transactionLines {
                  edges {
                    node {
                      amount
                      createdAt
                      id
                      paymentType {
                        code
                        description
                        name
                        sequenceNo
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
            variables: { reference },
        });

        if (!data) {
            return { errors: [{ message: "Failed to fetch transaction receipt" }] };
        }

        const result: PaidTransactionType =
            data.transactions.edges.map((transaction: any) => ({
                ...transaction.node,
                lines: transaction.node.transactionLines.edges.map((line: any) => ({
                    ...line.node,
                    ...line.node.paymentType,
                })),
            }))[0];

        return { result, errors: null };
    } catch (error: any) {
        return { errors: [{ message: error.message }] };
    }
};