import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Introduce: React.FC = () => {
    const title = "QAMとは？";

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800 w-full">
            <Header title={title} />
            <div className="mx-auto container py-8 flex justify-center flex-1">
                <div className="w-full max-w-4xl p-4">
                    <div className="mx-3 p-2">
                        <h2 className="text-xl font-bold">QAMとは？</h2>
                        <p className="mt-2">
                            QAM（Quadrature Amplitude Modulation）は，位相変調と振幅変調を組み合わせた変調方式です．
                            位相変調と振幅変調を組み合わせることで、高いスペクトル効率を実現できます．
                        </p>
                        <p className="mt-2">
                            QAMは，デジタルテレビやデジタル無線通信などで広く利用されています．
                        </p>
                    </div>
                </div>
                <h1 className="text-5xl text-center">まだ作成中...</h1>
            </div>
            <Footer url="/" title="トップページへ"/>
        </div>
    );
};

export default Introduce;
