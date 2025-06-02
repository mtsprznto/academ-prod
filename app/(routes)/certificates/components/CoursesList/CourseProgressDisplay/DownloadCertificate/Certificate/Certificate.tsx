import { CertificateProps } from "./Certificate.types";

/*
Aqui se ajustan los textos dinamicos del certificado
*/

export function Certificate(props: CertificateProps) {
  const { certRef, titleCourse, userName } = props;
  return (
    <div
      ref={certRef}
      className="w-full h-[650px] relative bg-[url('/certificado.png')] bg-contain bg-center text-[#000]"
    >
      <p className="absolute text-4xl tracking-wide font-semibold top-[43%] left-1/2 transform -translate-x-1/50">
        {userName}
      </p>
      <p className="absolute font-semibold tracking-wide text-2xl top-[63%] left-1/2 transform -translate-x-1/10">
        {titleCourse}
      </p>
      <p className="absolute text-xs bottom-9 left-62">
        {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
