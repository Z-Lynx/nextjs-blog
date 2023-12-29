import { ApiResponse } from "@/core/model/posts.model";
import instance from "@/core/services/axios.model";
import { NextResponse } from "next/server";

export async function GET(request: Request, params: any) {
  try {
    const url = new URL(request.url!);

    let page: number = Number(url.searchParams.get("page"));
    let limit: number = Number(url.searchParams.get("limit"));
    if (!limit) {
      limit = 10;
    }
    let skip: number = page * 10;

    const response = await instance.get(`/posts?skip=${skip}&limit=${limit}`);
    const data: ApiResponse = response.data;

    return NextResponse.json({
      data: data,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      error: error,
      status: 500,
    });
  }
}
