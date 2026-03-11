import { NextRequest, NextResponse } from "next/server";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";

const INITIATE_MPESA_PAYMENT = gql`
  mutation InitiateMpesaPayment($input: InitiateMpesaExpressPaymentInput!) {
    initiateMpesaExpressPayment(input: $input) {
      success
      message
      checkoutRequestId
    }
  }
`;

export async function POST(req: NextRequest) {
    try {
        const { amount, phoneNumber, email } = await req.json();
       

        if (!amount || !phoneNumber) {
            return NextResponse.json(
                { error: "Missing amount or phone number" },
                { status: 400 }
            );
        }

        const client = new ApolloClient({
            link: new HttpLink({
                uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
            }),
            cache: new InMemoryCache(),
        });

        const { data } = await client.mutate({
            mutation: INITIATE_MPESA_PAYMENT,
            variables: {
                input: {
                    phoneNumber,
                    email: email || "info@themwembe.ke",
                    amount,
                    accountReference: "Mwembe Campaign",
                    transactionDesc: "Donation",
                },
            },
        });

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}