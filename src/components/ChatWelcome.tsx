import { Button, Icon } from "@sk-web-gui/react";
import { Logo } from "./Logo";

export const ChatWelcome = ({
  setQuery,
  handleQuerySubmit,
  inputRef,
}: {
  setQuery: (s) => void;
  handleQuerySubmit: (s: string) => void;
  inputRef: React.MutableRefObject<HTMLInputElement>;
}) =>
  import.meta.env.VITE_APPLICATION === "VUX" ? (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex-grow flex flex-col items-center justify-center px-20">
        <div className="flex items-center justify-center h-[72px] w-[72px] rounded-12 bg-vattjom-surface-primary dark:bg-vattjom-background-200">
          <Logo size={72} bgColor={"transparent"} />
        </div>
        <div className="text-center mt-16">
          <h4>Vuxenutbildningen</h4>
          <p className="my-4 text-small">
            AI-assistent som svarar på frågor om Vuxenutbildningen
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-8 items-start">
        <h5 className="text-large font-bold">Vanliga frågor</h5>
        <ul>
          {[
            "Vad är vuxenutbildning?",
            "Hur ansöker jag till en kurs?",
            "Kan jag få studievägledning?",
          ].map((s, idx) => (
            <li key={idx} className="my-sm">
              <Button
                variant="ghost"
                onClick={() => {
                  setQuery(s);
                  handleQuerySubmit(s);
                  inputRef.current?.focus();
                }}
                className="rounded-12 p-12 bg-vattjom-surface-accent font-semibold text-grey-900 text-small flex items-center justify-around gap-12"
              >
                {s}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <></>
  );
