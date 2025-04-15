import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { FaPlus, FaTrash, FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  FormContainer,
  Section,
  SectionHeader,
  SectionTitle,
  AddButton,
  DeleteButton,
  ExperienceItem,
  FormGroup,
  Label,
  Input,
  TextArea,
  SubmitButton,
  CheckboxLabel,
  FileInputContainer,
  FileInputLabel,
  FileInput,
  FileName,
  FormRow,
} from "./styles";

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    // 기본 정보
    name: "",
    introduction: "",
    email: "",
    phone: "",
    // 자기 소개
    selfIntroduction: "",
    // 업무 경험
    workExperience: [
      {
        company: "",
        department: "",
        position: "",
        isCurrent: false,
        description: "",
      },
    ],
    // 프로젝트
    projects: [
      {
        name: "",
        organization: "",
        period: "",
        description: "",
        image: null,
        isRepresentative: false,
      },
    ],
    // 포트폴리오
    portfolio: "",
    // 기술 스택
    skills: ["", "", ""],
    // 학력
    education: [
      {
        university: "",
        major: "",
        period: "",
        description: "",
      },
    ],
    // 수상 및 활동
    awards: [
      {
        name: "",
        period: "",
        description: "",
      },
    ],
    // 자격증
    certificates: [
      {
        name: "",
        organization: "",
        date: "",
        number: "",
      },
    ],
    // 블로그 및 깃허브
    blog: "",
    github: "",
  });

  const handleInputChange = (section, field, value, index = null) => {
    if (index !== null) {
      setFormData((prev) => ({
        ...prev,
        [section]: prev[section].map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleAddItem = (section) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], {}],
    }));
  };

  const handleDeleteItem = (section, index) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: API 호출로 데이터 저장
    console.log(formData);
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        {/* 기본 정보 섹션 */}
        <Section>
          <SectionHeader>
            <SectionTitle>기본 정보</SectionTitle>
          </SectionHeader>
          <FormRow>
            <FormGroup>
              <Label>이름</Label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  handleInputChange(null, "name", e.target.value)
                }
                placeholder="이름을 입력하세요"
              />
            </FormGroup>
            <FormGroup>
              <Label>이메일</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  handleInputChange(null, "email", e.target.value)
                }
                placeholder="이메일을 입력하세요"
              />
            </FormGroup>
          </FormRow>
          <FormGroup>
            <Label>한 줄 소개</Label>
            <Input
              type="text"
              value={formData.introduction}
              onChange={(e) =>
                handleInputChange(null, "introduction", e.target.value)
              }
              placeholder="자신을 한 줄로 소개해주세요"
            />
          </FormGroup>
          <FormGroup>
            <Label>휴대폰 번호</Label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange(null, "phone", e.target.value)}
              placeholder="휴대폰 번호를 입력하세요"
            />
          </FormGroup>
        </Section>

        {/* 자기 소개 섹션 */}
        <Section>
          <SectionHeader>
            <SectionTitle>자기 소개</SectionTitle>
          </SectionHeader>
          <FormGroup>
            <TextArea
              value={formData.selfIntroduction}
              onChange={(e) =>
                handleInputChange(null, "selfIntroduction", e.target.value)
              }
              placeholder="자신의 경험, 강점, 목표 등을 자유롭게 작성해주세요"
            />
          </FormGroup>
        </Section>

        {/* 업무 경험 섹션 */}
        <Section>
          <SectionHeader>
            <SectionTitle>업무 경험</SectionTitle>
            <AddButton
              type="button"
              onClick={() => handleAddItem("workExperience")}
              title="업무 경험 추가"
            >
              <FaPlus />
            </AddButton>
          </SectionHeader>
          {formData.workExperience.map((exp, index) => (
            <ExperienceItem key={index}>
              <FormGroup>
                <Label>회사명</Label>
                <Input
                  type="text"
                  value={exp.company}
                  onChange={(e) =>
                    handleInputChange(
                      "workExperience",
                      "company",
                      e.target.value,
                      index
                    )
                  }
                  placeholder="회사명을 입력하세요"
                />
              </FormGroup>
              <FormGroup>
                <Label>부서</Label>
                <Input
                  type="text"
                  value={exp.department}
                  onChange={(e) =>
                    handleInputChange(
                      "workExperience",
                      "department",
                      e.target.value,
                      index
                    )
                  }
                  placeholder="부서명을 입력하세요"
                />
              </FormGroup>
              <FormGroup>
                <Label>직함</Label>
                <Input
                  type="text"
                  value={exp.position}
                  onChange={(e) =>
                    handleInputChange(
                      "workExperience",
                      "position",
                      e.target.value,
                      index
                    )
                  }
                  placeholder="직함을 입력하세요"
                />
              </FormGroup>
              <FormGroup>
                <CheckboxLabel>
                  <Input
                    type="checkbox"
                    checked={exp.isCurrent}
                    onChange={(e) =>
                      handleInputChange(
                        "workExperience",
                        "isCurrent",
                        e.target.checked,
                        index
                      )
                    }
                  />
                  현재 재직 중
                </CheckboxLabel>
              </FormGroup>
              <FormGroup>
                <Label>내용</Label>
                <TextArea
                  value={exp.description}
                  onChange={(e) =>
                    handleInputChange(
                      "workExperience",
                      "description",
                      e.target.value,
                      index
                    )
                  }
                  placeholder="주요 업무 내용과 성과를 작성해주세요"
                />
              </FormGroup>
              <DeleteButton
                type="button"
                onClick={() => handleDeleteItem("workExperience", index)}
              >
                <FaTrash /> 삭제
              </DeleteButton>
            </ExperienceItem>
          ))}
        </Section>

        {/* 프로젝트 섹션 */}
        <Section>
          <SectionHeader>
            <SectionTitle>프로젝트</SectionTitle>
            <AddButton
              type="button"
              onClick={() => handleAddItem("projects")}
              title="프로젝트 추가"
            >
              <FaPlus />
            </AddButton>
          </SectionHeader>
          {formData.projects.map((project, index) => (
            <ExperienceItem key={index}>
              <FormGroup>
                <Label>프로젝트명</Label>
                <Input
                  type="text"
                  value={project.name}
                  onChange={(e) =>
                    handleInputChange("projects", "name", e.target.value, index)
                  }
                  placeholder="프로젝트명을 입력하세요"
                />
              </FormGroup>
              <FormGroup>
                <Label>이행 기관</Label>
                <Input
                  type="text"
                  value={project.organization}
                  onChange={(e) =>
                    handleInputChange(
                      "projects",
                      "organization",
                      e.target.value,
                      index
                    )
                  }
                  placeholder="이행 기관을 입력하세요"
                />
              </FormGroup>
              <FormGroup>
                <Label>기간</Label>
                <Input
                  type="text"
                  value={project.period}
                  onChange={(e) =>
                    handleInputChange(
                      "projects",
                      "period",
                      e.target.value,
                      index
                    )
                  }
                  placeholder="예: 2023.01 - 2023.06"
                />
              </FormGroup>
              <FormGroup>
                <Label>상세 내용</Label>
                <TextArea
                  value={project.description}
                  onChange={(e) =>
                    handleInputChange(
                      "projects",
                      "description",
                      e.target.value,
                      index
                    )
                  }
                  placeholder="프로젝트의 주요 내용과 성과를 작성해주세요"
                />
              </FormGroup>
              <FormGroup>
                <Label>대표 이미지</Label>
                <FileInputContainer>
                  <FileInputLabel htmlFor={`project-image-${index}`}>
                    이미지 선택
                  </FileInputLabel>
                  <FileInput
                    id={`project-image-${index}`}
                    type="file"
                    onChange={(e) =>
                      handleInputChange(
                        "projects",
                        "image",
                        e.target.files[0],
                        index
                      )
                    }
                  />
                  {project.image && <FileName>{project.image.name}</FileName>}
                </FileInputContainer>
              </FormGroup>
              <FormGroup>
                <CheckboxLabel>
                  <Input
                    type="checkbox"
                    checked={project.isRepresentative}
                    onChange={(e) =>
                      handleInputChange(
                        "projects",
                        "isRepresentative",
                        e.target.checked,
                        index
                      )
                    }
                  />
                  대표 프로젝트로 설정
                </CheckboxLabel>
              </FormGroup>
              <DeleteButton
                type="button"
                onClick={() => handleDeleteItem("projects", index)}
              >
                <FaTrash /> 삭제
              </DeleteButton>
            </ExperienceItem>
          ))}
        </Section>

        {/* 포트폴리오 섹션 */}
        <Section>
          <SectionHeader>
            <SectionTitle>포트폴리오</SectionTitle>
          </SectionHeader>
          <FormGroup>
            <Label>포트폴리오 링크</Label>
            <Input
              type="url"
              value={formData.portfolio}
              onChange={(e) =>
                handleInputChange(null, "portfolio", e.target.value)
              }
            />
          </FormGroup>
        </Section>

        {/* 기술 스택 섹션 */}
        <Section>
          <SectionHeader>
            <SectionTitle>기술 스택</SectionTitle>
          </SectionHeader>
          {formData.skills.map((skill, index) => (
            <FormGroup key={index}>
              <Label>대표 스킬 {index + 1}</Label>
              <Input
                type="text"
                value={skill}
                onChange={(e) => {
                  const newSkills = [...formData.skills];
                  newSkills[index] = e.target.value;
                  setFormData((prev) => ({ ...prev, skills: newSkills }));
                }}
              />
            </FormGroup>
          ))}
        </Section>

        {/* 학력 섹션 */}
        <Section>
          <SectionHeader>
            <SectionTitle>학력</SectionTitle>
          </SectionHeader>
          {formData.education.map((edu, index) => (
            <div key={index}>
              <FormGroup>
                <Label>대학교</Label>
                <Input
                  type="text"
                  value={edu.university}
                  onChange={(e) =>
                    handleInputChange(
                      "education",
                      "university",
                      e.target.value,
                      index
                    )
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>학부</Label>
                <Input
                  type="text"
                  value={edu.major}
                  onChange={(e) =>
                    handleInputChange(
                      "education",
                      "major",
                      e.target.value,
                      index
                    )
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>기간</Label>
                <Input
                  type="text"
                  value={edu.period}
                  onChange={(e) =>
                    handleInputChange(
                      "education",
                      "period",
                      e.target.value,
                      index
                    )
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>내용</Label>
                <TextArea
                  value={edu.description}
                  onChange={(e) =>
                    handleInputChange(
                      "education",
                      "description",
                      e.target.value,
                      index
                    )
                  }
                />
              </FormGroup>
            </div>
          ))}
          <AddButton type="button" onClick={() => handleAddItem("education")}>
            학력 추가
          </AddButton>
        </Section>

        {/* 수상 및 활동 섹션 */}
        <Section>
          <SectionHeader>
            <SectionTitle>수상 및 활동</SectionTitle>
          </SectionHeader>
          {formData.awards.map((award, index) => (
            <div key={index}>
              <FormGroup>
                <Label>수상 및 활동명</Label>
                <Input
                  type="text"
                  value={award.name}
                  onChange={(e) =>
                    handleInputChange("awards", "name", e.target.value, index)
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>기간</Label>
                <Input
                  type="text"
                  value={award.period}
                  onChange={(e) =>
                    handleInputChange("awards", "period", e.target.value, index)
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>상세 내용</Label>
                <TextArea
                  value={award.description}
                  onChange={(e) =>
                    handleInputChange(
                      "awards",
                      "description",
                      e.target.value,
                      index
                    )
                  }
                />
              </FormGroup>
            </div>
          ))}
          <AddButton type="button" onClick={() => handleAddItem("awards")}>
            수상 및 활동 추가
          </AddButton>
        </Section>

        {/* 자격증 섹션 */}
        <Section>
          <SectionHeader>
            <SectionTitle>수료 및 자격증</SectionTitle>
          </SectionHeader>
          {formData.certificates.map((cert, index) => (
            <div key={index}>
              <FormGroup>
                <Label>자격증명</Label>
                <Input
                  type="text"
                  value={cert.name}
                  onChange={(e) =>
                    handleInputChange(
                      "certificates",
                      "name",
                      e.target.value,
                      index
                    )
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>기관</Label>
                <Input
                  type="text"
                  value={cert.organization}
                  onChange={(e) =>
                    handleInputChange(
                      "certificates",
                      "organization",
                      e.target.value,
                      index
                    )
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>취득일</Label>
                <Input
                  type="date"
                  value={cert.date}
                  onChange={(e) =>
                    handleInputChange(
                      "certificates",
                      "date",
                      e.target.value,
                      index
                    )
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>자격증번호</Label>
                <Input
                  type="text"
                  value={cert.number}
                  onChange={(e) =>
                    handleInputChange(
                      "certificates",
                      "number",
                      e.target.value,
                      index
                    )
                  }
                />
              </FormGroup>
            </div>
          ))}
          <AddButton
            type="button"
            onClick={() => handleAddItem("certificates")}
          >
            자격증 추가
          </AddButton>
        </Section>

        {/* 블로그 및 깃허브 섹션 */}
        <Section>
          <SectionHeader>
            <SectionTitle>블로그 및 깃허브</SectionTitle>
          </SectionHeader>
          <FormGroup>
            <Label>블로그 링크</Label>
            <Input
              type="url"
              value={formData.blog}
              onChange={(e) => handleInputChange(null, "blog", e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>깃허브 링크</Label>
            <Input
              type="url"
              value={formData.github}
              onChange={(e) =>
                handleInputChange(null, "github", e.target.value)
              }
            />
          </FormGroup>
        </Section>

        <SubmitButton type="submit">이력서 저장하기</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default ResumeForm;
