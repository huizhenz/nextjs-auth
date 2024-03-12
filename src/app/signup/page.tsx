"use client";

// React
import * as React from "react";

// shadcn
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToastAction } from "@/components/ui/toast";

// zod & userSchema & react-hook-form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userSchema } from "@/validators/auth";

// Next.js - Image, Link, useRouter
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// react-icons
import { FaRegAddressCard } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";
import { LuUsers2 } from "react-icons/lu";

import { cn } from "@/lib/utils";

// axios
import axios from "axios";

type userType = z.infer<typeof userSchema>;

export default function Signup() {
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<userType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      sex: "",
      terms: false,
    },
  });

  const handleSubmit = async (data: userType) => {
    if (data.terms === true) {
      try {
        await axios.post("http://localhost:3001/user", data);

        toast({
          className: cn(
            "data-[state=open]:sm:slide-in-from-bottom-full to data-[state=open]:sm:slide-in-from-top-full top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 duration={3000}"
          ),
          title: "🎉 회원가입이 완료되었습니다.",
          // action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
        });

        setTimeout(() => {
          router.push("/");
        }, 1700);
      } catch (error) {
        console.log("데이터 전송 중 오류가 발생했습니다.");
      }
    } else {
      return;
    }
  };

  const handleClick = () => {
    form.trigger(["username", "email", "sex"]);

    const usernameState = form.getFieldState("username");
    const emailState = form.getFieldState("email");
    const sexState = form.getFieldState("sex");

    if (!usernameState.isDirty || usernameState.invalid) return;
    if (!emailState.isDirty || emailState.invalid) return;
    if (!sexState.isDirty || sexState.invalid) return;

    // if (
    //   usernameState.invalid &&
    //   emailState.invalid &&
    //   sexState.invalid
    //   //   form.getValues("terms")
    // ) {
    //   setConfirmed(true);
    // } else {
    //   setConfirmed(false);
    // }
  };

  return (
    <div className="my-16 mx-auto">
      <Card className="w-[480px]">
        <CardHeader>
          {/* 이미지를 가운데 배치하기 위해 부모 요소에 css */}
          <div className="flex justify-center">
            {/* 상대경로에서 /사용, width height값 꼭 지정, <Image /> 컴포넌트를 사용하는 것을 고려 */}
            <Image width={200} height={100} src="/logo.png" alt="Logo Image" />
          </div>
        </CardHeader>

        {/* css 의문 */}
        <div className="grid w-full items-center gap-4">
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-7"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormMessage />
                      <div className="flex items-center">
                        <FaRegAddressCard size="29" className="mr-4" />
                        <FormControl>
                          <Input
                            placeholder="이름"
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormMessage />
                      <div className="flex items-center">
                        <LuMail size="29" className="mr-4" />
                        <FormControl>
                          <Input
                            placeholder="이메일"
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormMessage />
                      <div className="flex items-center">
                        <RiLockPasswordLine size="29" className="mr-4" />
                        <FormControl>
                          {/* 비밀번호 type 설정 필수, input에다가 */}
                          <Input
                            placeholder="비밀번호"
                            type={"password"}
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <div className="text-xs pl-12">
                        영문, 숫자, 특수문자(!@$%&*?) 조합 8~15자리
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormMessage />{" "}
                      <div className="flex items-center">
                        <RiLockPasswordFill size="29" className="mr-4" />
                        <FormControl>
                          <Input
                            placeholder="비밀번호 확인"
                            type={"password"}
                            {...field}
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Radio Group */}
                <FormField
                  control={form.control}
                  name="sex"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormMessage />
                      <div className="flex items-center">
                        <LuUsers2
                          size="29"
                          // color="var(--primaryColor)"
                          className="mr-4"
                        />
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-6 "
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="male" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                남자
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="female" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                여자
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="none" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                선택 안함
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Check Box */}
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-4 space-y-0 rounded-md border p-3 shadow">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          <Link
                            href="https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&ssc=tab.nx.all&query=%EC%9D%B4%EC%9A%A9%EC%95%BD%EA%B4%80&oquery=%EC%95%BD%EA%B4%80%EB%8F%99%EC%9D%98&tqi=iP%2F94dqo1e8ss72G4Whssssss7w-428465"
                            className="font-semibold underline"
                          >
                            이용약관
                          </Link>
                          &nbsp;및{" "}
                          <Link
                            href="https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&ssc=tab.nx.all&query=%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4+%EC%B2%98%EB%A6%AC%EB%B0%A9%EC%B9%A8&oquery=%EC%9D%B4%EC%9A%A9%EC%95%BD%EA%B4%80&tqi=iP%2F96dqpts0ss7rs2f0ssssssRV-252315"
                            className="font-semibold underline"
                          >
                            개인정보 처리방침
                          </Link>
                          에 동의합니다.
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <CardFooter className="flex justify-center">
                  <Button type="submit" onClick={handleClick} variant="primary">
                    가입하기
                  </Button>
                </CardFooter>
              </form>
            </Form>
            <div className="text-base text-center">
              이미 회원이신가요?&nbsp;
              <Link href="/" className="text-primaryColor font-extrabold">
                로그인
              </Link>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
