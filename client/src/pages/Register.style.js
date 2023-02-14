import styled from "styled-components";

export const RegisterPage = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    justify-content: center; /*center vertically */
    align-items: center; /* center horizontally */
    background: linear-gradient( #0A2647, #03001C);
    padding: 10px;
`;

export const Container = styled.div`
    max-width: 700px;
    width: 100%;
    background: #fff;
    padding: 25px 30px;
    border-radius: 5px;

    @media only screen and (max-width: 584px) {
        max-width: 100%;
    }
`;

export const Title = styled.div`
    font-size: 25px;
    font-weight: 500;
    position: relative;
    
    &::before {
        content: "";
        position: absolute;
        height: 3.5px;
        width: 30px;
        background: linear-gradient(135deg, #71b7e6, #9b59b6);
        left: 0;
        bottom: 0;
    }
`;

export const RadioInput = styled.input`
    display: none;
`;

export const Category = styled.div`
    display: flex;
    width: 80%;
    margin: 15px 0;
    justify-content: space-between;

    @media only screen and (max-width: 584px) {
        width: 100%;
    }
`;

export const AccTypeLabel = styled.label`
    display: flex;
    align-items: center;
`;

export const AccTypeTitle = styled.div`
    font-size: 20px;
    font-weight: 500;
`;

export const DotOne = styled.span`
    height: 18px;
    width: 18px;
    border-radius: 50%;
    margin: 10px;
    border: 5px solid transparent;
    transition: all 0.3s ease;
    border-color: ${props => (props.accType === "student" ? "#d9d9d9" : "none")};
    background: ${props => (props.accType === "student" ? "#9b59b6" : "#d9d9d9")};
`;

export const DotTwo = styled.span`
    height: 18px;
    width: 18px;
    border-radius: 50%;
    margin: 10px;
    border: 5px solid transparent;
    transition: all 0.3s ease;
    border-color: ${props => (props.accType === "staff" ? "#d9d9d9" : "none")};
    background: ${props => (props.accType === "staff" ? "#9b59b6" : "#d9d9d9")};
`


export const UserDetails = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px 0 12px 0;

    @media only screen and (max-width: 584px) {
        max-height: 300px;
        overflow-y: scroll;
    }

    &::-webkit-scrollbar {
        width: 0;
    }
`;

export const FormInputBox = styled.div`
    width: calc(100% / 2 - 20px);
    margin-bottom: 15px;

    @media only screen and (max-width: 584px) {
        width: 100%;
    }
`;

export const Details = styled.span`
    font-weight: 500;
    margin-bottom: 5px;
    display: block;
`;

export const FormInput = styled.input`
    height: 45px;
    width: 100%;
    outline: none;
    border-radius: 5px;
    border: 1px solid #d9d9d9;
    padding-left: 15px;
    font-size: 16px;
    border-bottom-width: 2px;
    transition: all 0.3s ease; 
    
    &:focus {
        border-color: #9b59b6;
    }

    &:valid {
        border-color: #9b59b6;
    }
`;

export const VerifyButtonBox = styled.div`
    margin: 0;
    padding: 6px 100px;
`;

export const VerifyButton = styled.div`
    margin: 0;
    padding: 4px;
    color:#ffffff;
    background: linear-gradient(135deg, #71b7e6, #9b59b6);
    border-radius: 6px;

    &:hover {
        background: linear-gradient(-135deg, #71b7e6, #9b59b6);
        box-shadow: .2em .2em rgb(108, 108, 108);
	    transition: all .25s ease-in-out;
    }

    &:active {
        box-shadow: 2px 2px 5px #333;
        box-shadow: .05em .05em rgb(77, 77, 77);
	    transform: translate(.25em, .25em);
    }
`;

export const SubmitButtonBox = styled.div`
    height: 45px;
    margin: 45px 0;
`;

export const SubmitButton = styled.input`
    height: 100%;
    width: 100%;
    outline: none;
    color: #fff;
    border: none;
    font-size: 18px;
    font-weight: 500;
    border-radius: 5px;
    background: linear-gradient(135deg, #71b7e6, #9b59b6);
    transition: all 0.3s ease;

    &:hover {
        background: linear-gradient(-135deg, #71b7e6, #9b59b6);
    }
`;

export const LinkButton = styled.div`
    color: darkcyan;

    &:hover {
        color: darkslateblue;
    }
`;