// export const ButtonStyle = css`
//   text-decoration: none;
//   padding: 5px 15px;
//   border-radius: 5px;
//   border: 0;
//   cursor: pointer;
//   display: inline-flex;
//   align-items: center;
//   svg {
//     height: 16px;
//     margin-right: 5px;
//   }
//   ${(props) =>
//     props.black &&
//     !props.outlined &&
//     css`
//       background-color: #000;
//       color: #fff;
//     `}
//   ${(props) =>
//     props.black &&
//     props.outlined &&
//     css`
//       background-color: transparent;
//       color: #000;
//       border: 1px solid #000;
//     `}
//   ${(props) =>
//     props.white &&
//     !props.outlined &&
//     css`
//       background-color: #fff;
//       color: #000;
//     `}
//   ${(props) =>
//     props.white &&
//     props.outlined &&
//     css`
//       background-color: transparent;
//       color: #fff;
//       border: 1px solid #fff;
//     `}
// ${(props) =>
//     props.primary &&
//     !props.outlined &&
//     css`
//       background-color: ${primary};
//       color: #fff;
//       border: 1px solid ${primary};
//     `}
//     ${(props) =>
//     props.primary &&
//     props.outlined &&
//     css`
//       background-color: transparent;
//       color: ${primary};
//       border: 1px solid ${primary};
//     `}
//     ${(props) =>
//     props.block &&
//     css`
//       display: block;
//       width: 100%;
//     `}
// ${(props) =>
//     props.size === 'l' &&
//     css`
//       font-size: 1rem;
//       padding: 10px 20px;
//       svg {
//         height: 20px;
//       }
//     `}
// `;

export default function Button({ children, ...rest }) {
  let Styles = 'py-[5px] px-[15px] rounded pointer flex items-center';
  if (rest.link) {
    Styles = Styles + ' bg-transparent border border-white';
  }
  if (rest.white) {
    Styles = Styles + ' bg-white text-black';
  }

  if (rest.primary && rest.outlined) {
    Styles = Styles + ' bg-transparent text-[#0D3D29] border border-[#0D3D29]';
  }
  if (rest.primary && !rest.outlined) {
    Styles = Styles + ' text-white bg-[#0D3D29] border border-[#0D3D29]';
  }

  if (rest.black) {
    Styles =
      Styles + ' bg-black text-white w-full flex justify-center items-center';
  }

  let buttonType;

  if (rest.submit) {
    buttonType = 'submit';
  }

  return (
    <button type={buttonType} className={Styles}>
      {children}
    </button>
  );
}
