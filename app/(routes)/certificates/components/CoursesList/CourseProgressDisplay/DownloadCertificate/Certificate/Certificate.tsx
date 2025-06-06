import { CertificateProps } from "./Certificate.types";

/*
Hay que mejorar la descarga el certificado en mobile
*/

export function Certificate(props: CertificateProps) {
  const { certRef, titleCourse, userName } = props;
  return (
    <div
      ref={certRef}
      className="h-[200px] md:max-w-[1020px] max-w-[320px] md:h-[650px] relative bg-[url('/certificado.png')] bg-cover md:bg-center text-[#000]"
    >
      <p className="absolute text-4xl tracking-wide font-semibold top-[20%] md:top-[43%] md:left-[60%] left-1/2 transform -translate-x-1/2">
        {userName}
      </p>
      <p className="absolute font-semibold tracking-wide md:text-[17px] md:top-[64%] md:left-1/2 transform -translate-x-1/10">
        {titleCourse}
      </p>
      <p className="absolute text-xs bottom-9 left-[62px]">
        {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
