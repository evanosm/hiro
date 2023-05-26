import Image from "next/image";
import Link from "next/link";

export default async function Index() {
  return (
    <>
      <div className="py-8 mt-32">
        <h1 className="text-5xl font-bold md:text-center">
          Une{" "}
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            solution
          </span>
          <br /> pour tous vos problèmes
        </h1>
        <p className="opacity-50 md:text-center mt-2">
          Vous êtes en danger ? Témoin d&apos;un crime ?<br /> Déclarez un
          incident et un héros viendra vous aider !
        </p>

        <div className="flex justify-center mt-8 gap-4">

          <Link href={"/register"} className="callToAction dark">
            Je m&apos;enregistre en tant que Héro
          </Link>
        </div>
      </div>
      <div className="w-full p-1 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-xl shadow-xl mt-64">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          <div className="flex flex-col items-center justify-center bg-white w-full py-4 rounded-t-lg md:rounded-tl-lg md:rounded-t-none">
            <h3 className="font-bold text-2xl">Étape 1 :</h3>
            <p>Déclarez un incident depuis le site.</p>
            <Image
              src="/images/app.svg"
              alt="Picture of the author"
              className="mt-4 h-64 w-auto"
              width={256}
              height={256}
            />
          </div>
          <div className="flex flex-col items-center justify-center bg-white w-full py-4 md:rounded-tr-lg">
            <h3 className="font-bold text-2xl">Étape 2 :</h3>
            <p>On envoie un héro régler l&apos;incident.</p>
            <Image
              src="/images/hero.svg"
              alt="Picture of the author"
              className="mt-4 h-64 w-auto"
              width={256}
              height={256}
            />
          </div>
          <div className="flex flex-col items-center md:col-span-2 justify-center bg-white w-full py-4 rounded-b-lg">
            <h3 className="font-bold text-2xl">Étape 3 :</h3>
            <p>Tout est réglé !</p>
            <Image
              src="/images/confirmed.svg"
              alt="Picture of the author"
              className="mt-4 h-64 w-auto"
              width={256}
              height={256}
            />
          </div>
        </div>
      </div>
    </>
  );
}
