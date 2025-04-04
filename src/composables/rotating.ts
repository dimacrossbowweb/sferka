import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";

interface IParams {

	yaw?: number;
	pitch?: number;

}

export function useRotating(el: any, params: IParams = {}) {
  let animCtx: any = null;

  const yaw = ref<number>( params?.yaw !== undefined ? params.yaw : 0);
  const pitch = ref<number>( params?.pitch !== undefined ? params.pitch : 0);

  const speedX = ref<number>(0.01);
  const speedY = ref<number>(0.01);

  const prevMouseX = ref<number>(0);
  const prevMouseY = ref<number>(0);

  const prevAngleX = ref<number>(0);
  const prevAngleY = ref<number>(0);

  const prevTime = ref<number>(0);

  try {
    onMounted((): void => {
      nextTick((): void => {
        animCtx = setInterval(autoRotating, 10);

        el.value.addEventListener("mousedown", onMouseDown);
      });
    });

    onBeforeUnmount((): void => {
      clearInterval(animCtx);

      el.value.removeEventListener("mousedown", onMouseDown);
    });

    function onMouseDown(e: any): void {
      const event = e || window.event;

      prevTime.value = new Date().getTime();

      prevMouseX.value = event.clientX;
      prevMouseY.value = event.clientY;

      prevAngleX.value = yaw.value;
      prevAngleY.value = pitch.value;

      document.body.addEventListener("mousemove", onMouseMove);
      document.body.addEventListener("mouseup", onMouseUp);

      clearInterval(animCtx);
    }

    function onMouseMove(e: any): void {
      const event = e || window.event;

      pitch.value =
        prevAngleX.value + (prevMouseY.value - event.clientY) / 100;
      yaw.value =
        prevAngleY.value + (event.clientX - prevMouseX.value) / 100;
    }

    function onMouseUp(e: any): void {
      const event = e || window.event;
      const currentTime: any = new Date().getTime();

      document.body.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseup", onMouseUp);

      animCtx = setInterval(autoRotating, 10);

      speedY.value =
        ((event.clientX - prevMouseX.value) / (currentTime - prevTime.value)) *
        0.1;

      speedX.value =
        ((prevMouseY.value - event.clientY) / (currentTime - prevTime.value)) *
        0.1;
    }

    function reduceSpeed(speed: number): number {
      const nextSpeedAbs: number = Math.abs(speed) - 0.0001;

      return Math.sign(speed) * (nextSpeedAbs > 0 ? nextSpeedAbs : 0);
    }

    function autoRotating(): void {
      speedX.value = reduceSpeed(speedX.value);
      speedY.value = reduceSpeed(speedY.value);

      yaw.value += speedY.value;
      pitch.value += speedX.value;
    }
  } catch (e: any) {
    console.error(e);
  }

  return {
    yaw,
    pitch,
  };
}
