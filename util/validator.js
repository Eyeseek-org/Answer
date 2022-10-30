import * as Yup from "yup";

export const DonateSchema = Yup.object({
  amount: Yup.string()
    .max(10, "max 10 numbers ")
    .test("checkAmount", "Can't donate less than 1 usdc", function (value) {
      return Number(value) >= 1;
    }),
});
