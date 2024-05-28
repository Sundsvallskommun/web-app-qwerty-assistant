import { Button, Icon, cx } from "@sk-web-gui/react";
import { Logo } from "./Logo";
import { getContent, getStyles } from "../services/config-service";
import { useAppContext } from "../context/app.context";

export const ChatWelcome = ({
  setQuery,
  handleQuerySubmit,
  inputRef,
}: {
  setQuery: (s) => void;
  handleQuerySubmit: (s: string) => void;
  inputRef: React.MutableRefObject<HTMLInputElement>;
}) => {
  const { assistantId } = useAppContext();
  const { header, subHeader, faqs } = getContent();
  const {
    brandButtons,
    brandLogoBackgroundColor,
    brandText,
    brandWeight,
    brandHeader,
    faqText,
    brandSansSerif,
  } = getStyles();

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex-grow flex flex-col items-center justify-center px-20">
        <div
          className={cx(
            `flex items-center justify-center h-72 w-72 rounded-12`,
            brandLogoBackgroundColor
          )}
        >
          <Logo size={72} bgColor={"transparent"} />
        </div>
        <div className={cx(`text-center mt-16`)}>
          <h4 className={cx(`${brandText} ${brandWeight}`)}>
            {import.meta.env.VITE_ASSISTANT_NAME}
          </h4>
          <p className={cx(`my-4 text-small !font-normal ${brandSansSerif}`)}>
            {subHeader}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-8 items-start">
        <h5 className={cx(`text-large ${brandText} ${brandWeight}`)}>
          Vanliga frågor
        </h5>
        <ul
          className={cx(
            `flex flex-col justify-center items-start self-stretch gap-12 ${faqText}`
          )}
        >
          {faqs.map((s, idx) => (
            <li key={idx}>
              <Button
                variant="ghost"
                disabled={!assistantId}
                onClick={() => {
                  setQuery(s);
                  handleQuerySubmit(s);
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className={cx(
                  `p-12 font-semibold text-grey-900 text-small flex items-center justify-around gap-12 rounded-bl-0`,
                  brandButtons
                )}
              >
                {s}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
