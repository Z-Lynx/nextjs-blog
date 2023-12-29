import { ApiResponse } from "@/core/model/posts.model";
import instance from "@/core/services/axios.model";
import { NextResponse } from "next/server";

type Params = { params: { id: string } };

export async function GET(request: Request, params: Params) {
  try {
    const response = await instance.get("/posts/" + params.params.id);
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
