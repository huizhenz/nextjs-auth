"use client";

import * as React from "react";

// shadcn
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

// zod & react-hook-form & userSchema
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userSchema } from "@/validators/auth";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";

type userType = z.infer<typeof userSchema>;

export default function Home() {
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

  console.log(form.watch());

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className="w-[350px]">
        <CardHeader>
          {/* 이미지를 가운데 배치하기 위해 부모 요소에 css */}
          <div className="flex justify-center">
            {/* 상대경로에서 /사용, width height값 꼭 지정, <Image /> 컴포넌트를 사용하는 것을 고려 */}
            <Image width={170} height={100} src="/logo.png" alt="Logo Image" />{" "}
          </div>
        </CardHeader>

        {/* css 의문 */}
        <div className="grid w-full items-center gap-4">
          <CardContent>
            <Form {...form}>
              <form className=" space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름</FormLabel>
                      <FormControl>
                        <Input placeholder="홍길동" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호</FormLabel>
                      <div className="text-xs">
                        영문, 숫자, 특수문자(!@$%&*?) 조합 8~15자리
                      </div>
                      <FormControl>
                        {/* 비밀번호 type 설정 필수, input에다가 */}
                        <Input type={"password"} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호 확인</FormLabel>
                      <FormControl>
                        <Input type={"password"} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sex"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>성별</FormLabel>

                      <FormControl>
                        <RadioGroup
                          className="flex space-x-5"
                          defaultValue="comfortable"
                        >
                          <div className="flex items-center space-x-1.5">
                            <RadioGroupItem value="default" id="r1" />
                            <Label htmlFor="r1">남자</Label>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <RadioGroupItem value="comfortable" id="r2" />
                            <Label htmlFor="r2">여자</Label>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <RadioGroupItem value="compact" id="r3" />
                            <Label htmlFor="r3">선택 안함</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center items-center space-x-1.5">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    이용약관 및 개인정보 처리방침에 동의합니다.
                  </label>
                </div>

                <CardFooter className="flex justify-center">
                  <Button type="submit">가입하기</Button>
                </CardFooter>
              </form>
            </Form>
            <div className="text-center">이미 회원이신가요? 로그인</div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}