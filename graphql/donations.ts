import { gql } from "@apollo/client";

export const INITIATE_MPESA_PAYMENT = gql`
  mutation InitiateMpesaPayment($input: InitiateMpesaExpressPaymentInput!) {
    initiateMpesaExpressPayment(input: $input) {
      success
      message
      checkoutRequestId
    }
  }
`;

export const MPESA_PAYMENT_SUBSCRIPTION = gql`
  subscription MpesaPaymentUpdates($checkoutRequestId: String!) {
    mpesaPaymentUpdates(checkoutRequestId: $checkoutRequestId) {
      status
      message
      receipt
      amount
    }
  }
`;