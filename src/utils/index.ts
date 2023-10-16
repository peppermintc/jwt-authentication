import { User } from "@types";

/**
 * API Request Body가 User 타입이 맞는지 체크하는 타입 가드
 * - 검증 통과시 User 타입으로 assert
 * - 검증 실패시 throw Error
 * */
function userTypeGuard(requestBody: any): asserts requestBody is User {
  const isValidObject = typeof requestBody === "object" && requestBody !== null;
  const isValidProperty =
    "username" in requestBody &&
    "password" in requestBody &&
    typeof requestBody.username === "string" &&
    typeof requestBody.password === "string";

  if (!isValidObject || !isValidProperty) throw new Error("Invalid User");
}

export { userTypeGuard };
