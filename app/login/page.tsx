"use client";
import { Button, Card } from "@nextui-org/react";
import { title } from "../../components/primitives";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import { useEffect, useMemo, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      fpsLimit: 120,
      fullScreen: true,
      particles: {
        color: { value: "#fff" },
        move: {
          direction: "bottom",
          enable: true,
          outModes: "out",
          speed: 2,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 400,
        },
        opacity: {
          value: 0.7,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: 5,
        },
        wobble: {
          enable: true,
          distance: 10,
          speed: 10,
        },
        zIndex: {
          value: { min: 0, max: 100 },
        },
      },
      detectRetina: true,
    }),
    []
  );
  if (init) {
    return (
      <div className=" align-middle  justify-center p-2 sm:p-0">
        <div className="z-50 justify-center text-center align-middle grid grid-rows-4">
          <div className="text-7xl">Welcome to the </div>
          <div className={title({ size: "lg", color: "logo" })}>SCCS</div>
          <div className={title({ size: "lg" })}>Course Planner&nbsp;</div>

          <Button
            variant="shadow"
            size="lg"
            className="w-2/6 justify-center align-middle justify-self-center sm:text-2xl sm:mt-20"
            onClick={() =>
              status != "authenticated"
                ? signIn("keycloak", { callbackUrl: "/" })
                : router.push("/")
            }
          >
            Get Started!
          </Button>
        </div>

        <div className="-z-50">
          <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={options}
          />
        </div>
      </div>
    );
  }
}
