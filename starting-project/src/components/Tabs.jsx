
export default function Tabs({ children, buttons, ButtonsConatiner="menu" }) {
  // const ButtonConatiner = buttonsContainer;
  return (
    <>
      <ButtonsConatiner>
        {buttons}
      </ButtonsConatiner>
      {children}
    </>

  );
}