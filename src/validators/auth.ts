import { z } from "zod";

const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$&*?!%])[A-Za-z\d!@$%&*?]{8,15}$/;

export const userSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "2글자 이상 입력해 주세요." })
      .max(100, { message: "100글자 이하 입력해 주세요." }),
    email: z.string().email({ message: "이메일을 올바르게 입력해 주세요." }),
    password: z
      .string()
      .min(8, { message: "8자리 이상 입력해 주세요." })
      .max(15, { message: "15자리 이하 입력해 주세요." })
      .regex(passwordRegex, {
        message: "영문, 숫자, 특수문자(~!@#$%^&*)를 모두 조합해 주세요.",
      }),
    confirmPassword: z
      .string()
      .nonempty({ message: "비밀번호를 재입력해 주세요." }),
    sex: z.string().min(1, { message: "성별을 선택해 주세요." }),
    terms: z.boolean().default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });
