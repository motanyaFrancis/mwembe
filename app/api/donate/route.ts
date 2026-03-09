import { NextRequest, NextResponse } from "next/server";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
// import fetch from "cross-fetch";

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
    const { amount, phoneNumber } = await req.json();

    if (!amount || !phoneNumber) {
        return NextResponse.json({ error: "Missing amount or phone number" }, { status: 400 });
    }

    const client = new ApolloClient({
        link: new HttpLink({
            uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
            fetch, // global fetch works in Next.js server
        }),
        cache: new InMemoryCache(),
    });

    try {
        const { data } = await client.mutate({
            mutation: INITIATE_MPESA_PAYMENT,
            variables: {
                input: {
                    amount,
                    phoneNumber,
                    accountReference: "Mwembe Campaign",
                    transactionDesc: "Donation",
                },
            },
        });

        return NextResponse.json({ data });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}