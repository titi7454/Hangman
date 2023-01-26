const HEAD = <div className="head" key={0}/>;

const BODY = <div className="body"key={1}/>;  

const LEFT_ARM = <div className="left--arm" key={2}/>;

const RIGHT_ARM = <div className="right--arm" key={3}/>;

const LEFT_LEG = <div className="left--leg" key={4}/>;

const RIGHT_LEG = <div className="right--leg" key={5}/>;

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

type HangmanDrawingProps = {
  numberOfGuesses: number;
};

export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
  return (
    <div className="drawing">
        {BODY_PARTS.slice(0, numberOfGuesses)}
      <div className="down" />
      <div className="right" />
      <div className="center" />
      <div className="bottom" />
    </div>
  );
}
