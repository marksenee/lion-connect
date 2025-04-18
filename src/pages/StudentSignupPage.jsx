import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { Link, useNavigate } from "react-router-dom";
import { apis } from "../apis/apis";
import { userApis } from "../apis/userApis";

const Container = styled.div`
  max-width: 500px;
  margin: 60px auto;
  padding: 40px;
  background-color: white;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: ${theme.colors.text};
  margin-bottom: 16px;
  text-align: center;
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: ${theme.colors.textSecondary};
  text-align: center;
  margin-bottom: 40px;
  line-height: 1.6;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.text};
  margin-left: 4px;
`;

const Input = styled.input`
  padding: 16px;
  border: 2px solid ${theme.colors.border};
  border-radius: 16px;
  font-size: 16px;
  transition: all 0.2s ease;
  background-color: ${theme.colors.white};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    background-color: white;
    box-shadow: 0 0 0 4px rgba(255, 107, 107, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.textSecondary};
  }
`;

const TextArea = styled.textarea`
  padding: 16px;
  border: 2px solid ${theme.colors.border};
  border-radius: 16px;
  font-size: 16px;
  min-height: 120px;
  resize: vertical;
  transition: all 0.2s ease;
  background-color: ${theme.colors.lightGray};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    background-color: white;
    box-shadow: 0 0 0 4px rgba(255, 107, 107, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.textSecondary};
  }
`;

const Button = styled.button`
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
  color: white;
  padding: 16px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  margin-top: 8px;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, #4ecdc4, #ff6b6b);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0);
  }

  span {
    position: relative;
    z-index: 1;
  }
`;

const HelperText = styled.p`
  font-size: 12px;
  color: ${theme.colors.textSecondary};
  margin-top: 4px;
  margin-left: 4px;
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.text};
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 24px;
  transition: all 0.2s ease;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const StudentSignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    course: "",
    skills: "",
    portfolio: "",
    introduction: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 확인
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 필요한 필드만 추출하고 userType을 명시적으로 추가
      const payload = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        userType: "student", // 'user_type' 대신 'userType'으로, 값은 'student'
        skills: formData.skills, // skills는 문자열 형태이므로 필요시 배열로 변환해야 할 수 있습니다. API 스펙 확인 필요.
        course: formData.course,
        // portfolio: formData.portfolio, // 필요한 경우 추가
        // introduction: formData.introduction, // 필요한 경우 추가
      };

      // skills 필드가 콤마로 구분된 문자열이라면 배열로 변환
      if (typeof payload.skills === "string") {
        payload.skills = payload.skills
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s);
      }

      const response = await userApis.postSignUp(payload); // 수정된 payload 전달

      if (response && response.status === 201) {
        // 성공 상태 코드 확인 (보통 201 Created)
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      } else {
        // 서버에서 구체적인 에러 메시지를 보내준다면 표시하는 것이 좋습니다.
        const errorMessage =
          response?.data?.message ||
          "회원가입에 실패했습니다. 입력값을 확인해주세요.";
        alert(errorMessage);
      }
    } catch (error) {
      console.error("회원가입 에러:", error.response || error); // 에러 응답 상세 내용 확인
      // 네트워크 에러 또는 서버 응답 에러 구분
      const message =
        error.response?.data?.message ||
        "회원가입 중 오류가 발생했습니다. 다시 시도해주세요.";
      alert(message);
    }
  };

  return (
    <Container>
      <BackLink to="/login">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        로그인으로 돌아가기
      </BackLink>

      <Title>수료생 회원가입</Title>
      <Subtitle>당신의 커리어를 시작하기 위한 첫 걸음</Subtitle>

      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>이름</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="이름을 입력하세요"
            required
          />
        </InputGroup>

        <InputGroup>
          <Label>이메일</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일을 입력하세요"
            required
          />
        </InputGroup>

        <InputGroup>
          <Label>비밀번호</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
            required
          />
          <HelperText>
            8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.
          </HelperText>
        </InputGroup>

        <InputGroup>
          <Label>비밀번호 확인</Label>
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="비밀번호를 다시 입력하세요"
            required
          />
        </InputGroup>

        <InputGroup>
          <Label>수료 과정</Label>
          <Input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="수료한 과정을 입력하세요"
            required
          />
        </InputGroup>

        <InputGroup>
          <Label>기술 스택</Label>
          <Input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="예: React, Node.js, Python"
            required
          />
          <HelperText>쉼표로 구분하여 입력해주세요.</HelperText>
        </InputGroup>
        <Button type="submit">
          <span>회원가입 완료</span>
        </Button>
      </Form>
    </Container>
  );
};

export default StudentSignupPage;
