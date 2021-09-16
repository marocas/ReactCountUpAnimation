import {
  createRef,
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
  VFC,
} from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  amount: string;
  duration: number;
}

export const Counter: VFC<IProps> = ({
  amount,
  duration,
  className,
  children,
  ...args
}) => {
  const targetRef = createRef<HTMLParagraphElement>();
  const counterRef = useRef(0);
  const [count, setCount] = useState(0);
  const amountValue = +amount.replace(/\D+/g, "");
  const amountText = amount.replace(/[0-9]/g, "");

  const counterAnimation = (targetRef: any) => {
    if (!targetRef || targetRef.classList.contains("-animated")) return;

    const rect = targetRef.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;
    const isVisible = elemTop < window?.innerHeight && elemBottom >= 0;

    if (isVisible) {
      targetRef.classList.add("-animated");
      console.log(
        "started = speed milliseconds =>",
        Math.trunc((duration * 1000) / amountValue),
      );
      const timerFn = () => {
        if (counterRef.current < amountValue) {
          counterRef.current = counterRef.current + 1;
          setCount(counterRef.current);
        }

        if (counterRef.current >= amountValue) clearInterval(timerInterval);
      };

      const timerInterval = setInterval(
        timerFn,
        Math.trunc((duration * 1000) / amountValue),
      );
    }
  };

  useEffect(() => {
    counterAnimation(targetRef.current);

    window.addEventListener("scroll", () =>
      counterAnimation(targetRef.current),
    );

    return () => window.removeEventListener("scroll", counterAnimation);
  });

  return (
    <p ref={targetRef} className={className}>
      <span>{count}</span>
      {amountText}
      {children}
    </p>
  );
};
