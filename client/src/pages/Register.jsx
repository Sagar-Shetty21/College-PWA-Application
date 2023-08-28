import {React, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RegisterPage, Container, SubmitButtonBox, SubmitButton, UserDetails, FormInput, Details, VerifyButtonBox, VerifyButton, FormInputBox, Title, RadioInput, AccTypeTitle, DotOne, DotTwo, Category, AccTypeLabel, LinkButton} from "./Register.style";
import LoadingScreen from '../utils/LoadingScreen';


const Register = () => {
    const [idNumber, setIdNumber] = useState('');
    const [fullName, setFullName] = useState('');
    const [section, setSection] = useState('');
    const [designation, setDesignation] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [accType, setAccType] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);


  
    async function handleSubmit(event){
      event.preventDefault();
      setIsLoading(true);

      if(document.querySelector('#readOnlyInput').value === ''){
        toast.warning("Fill all input fields!")
      }else{
        if(password === confirmPassword){
          fetch(`${process.env.REACT_APP_API_ENDPOINT}/authentication/register`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              idNumber: idNumber,
              name: fullName,
              gender: gender,
              section: section,
              designation: designation,
              email: email,
              phone: phoneNumber,
              password: password,
              type: accType,
              //image: image
            })
          })
          .then(response => response.json())
          .then(data => {
              setIsLoading(false);
              if(data.message) {
                toast.success(data.message)
                navigate("/login")
              }
              else if(data.err.code === "ER_DUP_ENTRY") {
                toast.warning("User with this ID number already exists.")
              }else {
                toast.error("There was an error, please try again!")
              }
          })
        }else{
          toast.warning("Passwords do not match!")
        }
      }
    }

    async function verifyId(){
      if(accType) {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/authentication/verifyid?idNumber=${idNumber}&accType=${accType}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {
          setIsLoading(false);
          if (data.error) {
            toast.error(data.error.code)
          }else {
            if(data.result[0].section){
              setIdNumber(data.result[0].student_id);
              setFullName(data.result[0].name);
              setSection(data.result[0].section);
              setGender(data.result[0].gender);
            }else{
              setIdNumber(data.result[0].staff_id);
              setFullName(data.result[0].name);
              setDesignation(data.result[0].designation);
              setGender(data.result[0].gender);
            }
          }
        })
      }else{
        toast.warning("Please select an account type.")
      }
    }
  
    return (
      <RegisterPage>
        <Container>
          <Title>Registration</Title>
          <form onSubmit={handleSubmit}>
            <div>
              <RadioInput type="radio" name="accType" id="dot-1" onChange={(e) => setAccType(e.target.value)} value="student" required checked={accType === 'student'}/>
              <RadioInput type="radio" name="accType" id="dot-2" onChange={(e) => setAccType(e.target.value)} value="staff" required checked={accType === 'staff'}/>
              <Category>
                  <AccTypeLabel for="dot-1">
                      <DotOne accType={accType}/>
                      <AccTypeTitle>Student</AccTypeTitle>
                  </AccTypeLabel>
                  <AccTypeLabel for="dot-2">
                      <DotTwo accType={accType}/>
                      <AccTypeTitle>Staff</AccTypeTitle>
                  </AccTypeLabel>
              </Category>
            </div>
            <UserDetails>
              <FormInputBox>
                <Details>ID Number</Details>
                <FormInput id="user_id_input" type="text" placeholder="R1234567" required onChange={(e) => setIdNumber(e.target.value)} value={idNumber}/>
                <VerifyButtonBox>
                  <VerifyButton onClick={verifyId}>Verify</VerifyButton>
                </VerifyButtonBox>
              </FormInputBox>
              <FormInputBox>
                <Details>Full Name</Details>
                <FormInput type="text" placeholder="E.g: John Smith" required readOnly onChange={(e) => setFullName(e.target.value)} value={fullName}/>
              </FormInputBox>
              {
                accType === "student" ? 
                  <FormInputBox>
                    <Details>Section</Details>
                    <FormInput type="text" id="readOnlyInput" placeholder="E.g: B.Com" required readOnly onChange={(e) => setSection(e.target.value)} value={section}/>
                  </FormInputBox> :
                  <FormInputBox>
                    <Details>Designation</Details>
                    <FormInput type="text" id="readOnlyInput" placeholder="E.g: Professor" required readOnly onChange={(e) => setDesignation(e.target.value)} value={designation}/>
                  </FormInputBox>
              }
              <FormInputBox>
                <Details>Gender</Details>
                <FormInput type="text" placeholder="Male/Female" required readOnly onChange={(e) => setGender(e.target.value)} value={gender}/>
              </FormInputBox>
              <FormInputBox>
                <Details>Email</Details>
                <FormInput type="email" placeholder="johnsmith@email.com" required onChange={(e) => setEmail(e.target.value)} value={email}/>
              </FormInputBox>
              <FormInputBox>
                <Details>Phone Number</Details>
                <FormInput type="tel" pattern="[0-9]{10}" placeholder="0123456789" required onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber}/>
              </FormInputBox>
              <FormInputBox>
                <Details>Password</Details>
                <FormInput type="password" placeholder="********" required onChange={(e) => setPassword(e.target.value)} value={password}/>
              </FormInputBox>
              <FormInputBox>
                <Details>Confirm Password</Details>
                <FormInput type="password" placeholder="********" required onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}/>
              </FormInputBox>
            </UserDetails>
            <SubmitButtonBox>
              <SubmitButton type="submit" value="Register" />
            </SubmitButtonBox>
          </form>
          <LinkButton><Link to="/">Back to Login</Link></LinkButton>
        </Container>
      {isLoading && <LoadingScreen />}
      </RegisterPage>
  )
}

export default Register;