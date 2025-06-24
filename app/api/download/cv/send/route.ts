import { NextResponse } from "next/server";


export async function get() {
try {
return NextResponse.json({"success"})
} catch (error) {

  return NextResponse.json({error}, {status: 500}) 
}
}   