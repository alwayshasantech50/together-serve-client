"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { getAuthHeaders } from "@/lib/getAuthHeaders";


const JWTTestPage = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");

    const testAccess = async (useValidToken) => {
        setLoading(true);
        setResult("");

        try {
            let headers = {
                Authorization: "Bearer invalid-token",
            };

            if (useValidToken) {
                headers = await getAuthHeaders();
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/private-test`,
                { headers }
            );

            const data = await response.json();

            setResult(`${response.status}: ${data.message}`);

            if (!response.ok) {
                toast.error(data.message);
                return;
            }

            toast.success("Protected API accessed successfully!");
        } catch (error) {
            const message = error.message || "Unable to complete the test.";

            setResult(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="mx-auto max-w-xl px-6 py-16">
            <div className="rounded-2xl bg-base-200 p-8">
                <h1 className="text-3xl font-bold">JWT connection test</h1>

                <p className="mt-4 leading-7">
                    Login first, then check whether the protected API accepts
                    your token.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                    <button
                        type="button"
                        onClick={() => testAccess(true)}
                        disabled={loading}
                        className="btn rounded-full border-0 bg-green-700 text-white hover:bg-green-800"
                    >
                        Test my login token
                    </button>

                    <button
                        type="button"
                        onClick={() => testAccess(false)}
                        disabled={loading}
                        className="btn btn-outline rounded-full"
                    >
                        Test an invalid token
                    </button>
                </div>

                {loading && <p className="mt-5">Checking token...</p>}

                {result && (
                    <p role="status" className="mt-5 break-words">
                        {result}
                    </p>
                )}
            </div>
        </section>
    );
};

export default JWTTestPage;