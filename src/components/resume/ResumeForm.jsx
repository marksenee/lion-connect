import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { FaPlus, FaTrash, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { apis } from "../../apis/apis";

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Section = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  background-color: ${theme.colors.white};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${theme.colors.primary};
`;

const AddButton = styled.button`
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: ${theme.colors.primaryDark};
  }
`;

const DeleteButton = styled.button`
  background-color: ${theme.colors.error};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: ${theme.colors.errorDark};
  }
`;

const ExperienceItem = styled.div`
  border: 1px solid ${theme.colors.border};
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  position: relative;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: ${theme.colors.text};

  &::after {
    content: ${(props) => (props.required ? '" *"' : '""')};
    color: ${theme.colors.error};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid ${theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const FileInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FileInputLabel = styled.label`
  background-color: ${theme.colors.primary};
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;

  &:hover {
    background-color: ${theme.colors.primaryDark};
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileName = styled.span`
  color: ${theme.colors.text};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const SubmitButton = styled.button`
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  width: 100%;
  margin-top: 20px;

  &:hover {
    background-color: ${theme.colors.primaryDark};
  }
`;

const TechStackInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const TechStackTag = styled.span`
  background-color: ${theme.colors.lightGray};
  padding: 4px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.error};
  cursor: pointer;
  padding: 0;
  font-size: 1rem;
`;

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    // 기본 정보
    name: "",
    email: "",
    phone: "",
    introduction: "",
    portfolio: "",
    blog: "",
    github: "",

    // 업무 경험
    workExperience: [
      {
        company: "",
        department: "",
        position: "",
        isCurrent: false,
        startDate: "",
        endDate: "",
        description: "",
      },
    ],

    // 프로젝트
    projects: [
      {
        name: "",
        description: "",
        organization: "",
        portfolioUrl: "",
        image: null,
        isRepresentative: false,
        startDate: "",
        endDate: "",
        techStack: [],
      },
    ],

    // 기술 스택
    skills: [],
    currentSkill: "",

    // 학력
    education: [
      {
        university: "",
        major: "",
        degree: "학사",
        startDate: "",
        endDate: "",
      },
    ],

    // 수상 및 활동
    awards: [
      {
        name: "",
        startDate: "",
        endDate: "",
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
    const emptyItem = {
      workExperience: {
        company: "",
        department: "",
        position: "",
        isCurrent: false,
        startDate: "",
        endDate: "",
        description: "",
      },
      projects: {
        name: "",
        description: "",
        organization: "",
        portfolioUrl: "",
        image: null,
        isRepresentative: false,
        startDate: "",
        endDate: "",
        techStack: [],
      },
      education: {
        university: "",
        major: "",
        degree: "학사",
        startDate: "",
        endDate: "",
      },
      awards: {
        name: "",
        startDate: "",
        endDate: "",
        description: "",
      },
      certificates: {
        name: "",
        organization: "",
        date: "",
        number: "",
      },
    };

    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], emptyItem[section]],
    }));
  };

  const handleDeleteItem = (section, index) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const handleAddSkill = (index) => {
    if (formData.currentSkill.trim()) {
      setFormData((prev) => ({
        ...prev,
        projects: prev.projects.map((project, i) =>
          i === index
            ? {
                ...project,
                techStack: [...project.techStack, prev.currentSkill.trim()],
              }
            : project
        ),
        currentSkill: "",
      }));
    }
  };

  const handleRemoveSkill = (projectIndex, skillIndex) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((project, i) =>
        i === projectIndex
          ? {
              ...project,
              techStack: project.techStack.filter((_, j) => j !== skillIndex),
            }
          : project
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 데이터 가공
    const resumeData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      introduction: formData.introduction,
      portfolio: formData.portfolio,
      blog: formData.blog,
      github: formData.github,
      workExperience: formData.workExperience.map((exp) => ({
        company: exp.company,
        department: exp.department,
        position: exp.position,
        is_current: exp.isCurrent,
        startDate: exp.startDate,
        endDate: exp.endDate,
        description: exp.description,
      })),
      projects: formData.projects.map((project) => ({
        title: project.name,
        description: project.description,
        organization: project.organization,
        portfolio_url: project.portfolioUrl,
        image: project.image,
        is_representative: project.isRepresentative,
        startDate: project.startDate,
        endDate: project.endDate,
        techStack: project.techStack,
      })),
      skills: formData.skills,
      education: formData.education.map((edu) => ({
        school: edu.university,
        major: edu.major,
        degree: edu.degree,
        startDate: edu.startDate,
        endDate: edu.endDate,
      })),
      awards: formData.awards.map((award) => ({
        title: award.name,
        startDate: award.startDate,
        endDate: award.endDate,
        description: award.description,
      })),
      certificates: formData.certificates.map((cert) => ({
        title: cert.name,
        organization: cert.organization,
        issueDate: cert.date,
        credential_id: cert.number,
      })),
    };

    try {
      const response = await apis.postResume(resumeData);
      if (response.status === 200) {
        alert("이력서가 성공적으로 저장되었습니다.");
      } else {
        alert("이력서 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("이력서 저장 중 오류 발생:", error);
      alert("이력서 저장 중 오류가 발생했습니다.");
    }
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
              <Label required>이름</Label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  handleInputChange(null, "name", e.target.value)
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <Label required>이메일</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  handleInputChange(null, "email", e.target.value)
                }
                required
              />
            </FormGroup>
          </FormRow>
          <FormGroup>
            <Label>전화번호</Label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange(null, "phone", e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>한 줄 자기소개</Label>
            <Input
              type="text"
              value={formData.introduction}
              onChange={(e) =>
                handleInputChange(null, "introduction", e.target.value)
              }
            />
          </FormGroup>
          <FormRow>
            <FormGroup>
              <Label>포트폴리오 URL</Label>
              <Input
                type="url"
                value={formData.portfolio}
                onChange={(e) =>
                  handleInputChange(null, "portfolio", e.target.value)
                }
              />
            </FormGroup>
            <FormGroup>
              <Label>블로그 URL</Label>
              <Input
                type="url"
                value={formData.blog}
                onChange={(e) =>
                  handleInputChange(null, "blog", e.target.value)
                }
              />
            </FormGroup>
          </FormRow>
          <FormGroup>
            <Label>GitHub URL</Label>
            <Input
              type="url"
              value={formData.github}
              onChange={(e) =>
                handleInputChange(null, "github", e.target.value)
              }
            />
          </FormGroup>
        </Section>

        {/* 업무 경험 섹션 */}
        <Section>
          <SectionHeader>
            <SectionTitle>업무 경험</SectionTitle>
            <AddButton onClick={() => handleAddItem("workExperience")}>
              <FaPlus /> 추가
            </AddButton>
          </SectionHeader>
          {formData.workExperience.map((exp, index) => (
            <ExperienceItem key={index}>
              <FormRow>
                <FormGroup>
                  <Label required>회사명</Label>
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
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label required>부서</Label>
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
                    required
                  />
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <Label required>직책</Label>
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
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>재직 여부</Label>
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
              </FormRow>
              <FormRow>
                <FormGroup>
                  <Label required>시작일</Label>
                  <Input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) =>
                      handleInputChange(
                        "workExperience",
                        "startDate",
                        e.target.value,
                        index
                      )
                    }
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label required>종료일</Label>
                  <Input
                    type="date"
                    value={exp.endDate}
                    onChange={(e) =>
                      handleInputChange(
                        "workExperience",
                        "endDate",
                        e.target.value,
                        index
                      )
                    }
                    required
                    disabled={exp.isCurrent}
                  />
                </FormGroup>
              </FormRow>
              <FormGroup>
                <Label>업무 설명</Label>
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
                />
              </FormGroup>
              <DeleteButton
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
            <AddButton onClick={() => handleAddItem("projects")}>
              <FaPlus /> 추가
            </AddButton>
          </SectionHeader>
          {formData.projects.map((project, index) => (
            <ExperienceItem key={index}>
              <FormGroup>
                <Label required>프로젝트명</Label>
                <Input
                  type="text"
                  value={project.name}
                  onChange={(e) =>
                    handleInputChange("projects", "name", e.target.value, index)
                  }
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label required>프로젝트 설명</Label>
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
                  required
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
                />
              </FormGroup>
              <FormGroup>
                <Label>포트폴리오 링크</Label>
                <Input
                  type="url"
                  value={project.portfolioUrl}
                  onChange={(e) =>
                    handleInputChange(
                      "projects",
                      "portfolioUrl",
                      e.target.value,
                      index
                    )
                  }
                />
              </FormGroup>
              <FormRow>
                <FormGroup>
                  <Label required>시작일</Label>
                  <Input
                    type="date"
                    value={project.startDate}
                    onChange={(e) =>
                      handleInputChange(
                        "projects",
                        "startDate",
                        e.target.value,
                        index
                      )
                    }
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label required>종료일</Label>
                  <Input
                    type="date"
                    value={project.endDate}
                    onChange={(e) =>
                      handleInputChange(
                        "projects",
                        "endDate",
                        e.target.value,
                        index
                      )
                    }
                    required
                  />
                </FormGroup>
              </FormRow>
              <FormGroup>
                <Label>기술 스택</Label>
                <Input
                  type="text"
                  value={formData.currentSkill}
                  onChange={(e) =>
                    handleInputChange(null, "currentSkill", e.target.value)
                  }
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSkill(index);
                    }
                  }}
                  placeholder="기술을 입력하고 Enter를 누르세요"
                />
                <TechStackInput>
                  {project.techStack.map((skill, skillIndex) => (
                    <TechStackTag key={skillIndex}>
                      {skill}
                      <RemoveButton
                        onClick={() => handleRemoveSkill(index, skillIndex)}
                      >
                        ×
                      </RemoveButton>
                    </TechStackTag>
                  ))}
                </TechStackInput>
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
              <FormGroup>
                <Label>프로젝트 이미지</Label>
                <FileInputContainer>
                  <FileInputLabel>
                    이미지 선택
                    <FileInput
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleInputChange(
                          "projects",
                          "image",
                          e.target.files[0],
                          index
                        )
                      }
                    />
                  </FileInputLabel>
                  {project.image && <FileName>{project.image.name}</FileName>}
                </FileInputContainer>
              </FormGroup>
              <DeleteButton onClick={() => handleDeleteItem("projects", index)}>
                <FaTrash /> 삭제
              </DeleteButton>
            </ExperienceItem>
          ))}
        </Section>

        {/* 학력 섹션 */}
        <Section>
          <SectionHeader>
            <SectionTitle>학력</SectionTitle>
            <AddButton onClick={() => handleAddItem("education")}>
              <FaPlus /> 추가
            </AddButton>
          </SectionHeader>
          {formData.education.map((edu, index) => (
            <ExperienceItem key={index}>
              <FormGroup>
                <Label required>학교명</Label>
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
                  required
                />
              </FormGroup>
              <FormRow>
                <FormGroup>
                  <Label required>전공</Label>
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
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label required>학위</Label>
                  <Input
                    as="select"
                    value={edu.degree}
                    onChange={(e) =>
                      handleInputChange(
                        "education",
                        "degree",
                        e.target.value,
                        index
                      )
                    }
                    required
                  >
                    <option value="학사">학사</option>
                    <option value="석사">석사</option>
                    <option value="박사">박사</option>
                  </Input>
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <Label required>입학일</Label>
                  <Input
                    type="date"
                    value={edu.startDate}
                    onChange={(e) =>
                      handleInputChange(
                        "education",
                        "startDate",
                        e.target.value,
                        index
                      )
                    }
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label required>졸업일</Label>
                  <Input
                    type="date"
                    value={edu.endDate}
                    onChange={(e) =>
                      handleInputChange(
                        "education",
                        "endDate",
                        e.target.value,
                        index
                      )
                    }
                    required
                  />
                </FormGroup>
              </FormRow>
              <DeleteButton
                onClick={() => handleDeleteItem("education", index)}
              >
                <FaTrash /> 삭제
              </DeleteButton>
            </ExperienceItem>
          ))}
        </Section>

        {/* 수상 및 활동 섹션 */}
        <Section>
          <SectionHeader>
            <SectionTitle>수상 및 활동</SectionTitle>
            <AddButton onClick={() => handleAddItem("awards")}>
              <FaPlus /> 추가
            </AddButton>
          </SectionHeader>
          {formData.awards.map((award, index) => (
            <ExperienceItem key={index}>
              <FormGroup>
                <Label required>수상 및 활동명</Label>
                <Input
                  type="text"
                  value={award.name}
                  onChange={(e) =>
                    handleInputChange("awards", "name", e.target.value, index)
                  }
                  required
                />
              </FormGroup>
              <FormRow>
                <FormGroup>
                  <Label required>시작일</Label>
                  <Input
                    type="date"
                    value={award.startDate}
                    onChange={(e) =>
                      handleInputChange(
                        "awards",
                        "startDate",
                        e.target.value,
                        index
                      )
                    }
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label required>종료일</Label>
                  <Input
                    type="date"
                    value={award.endDate}
                    onChange={(e) =>
                      handleInputChange(
                        "awards",
                        "endDate",
                        e.target.value,
                        index
                      )
                    }
                    required
                  />
                </FormGroup>
              </FormRow>
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
              <DeleteButton onClick={() => handleDeleteItem("awards", index)}>
                <FaTrash /> 삭제
              </DeleteButton>
            </ExperienceItem>
          ))}
        </Section>

        {/* 자격증 섹션 */}
        <Section>
          <SectionHeader>
            <SectionTitle>자격증</SectionTitle>
            <AddButton onClick={() => handleAddItem("certificates")}>
              <FaPlus /> 추가
            </AddButton>
          </SectionHeader>
          {formData.certificates.map((cert, index) => (
            <ExperienceItem key={index}>
              <FormGroup>
                <Label required>자격증명</Label>
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
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label required>발급 기관</Label>
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
                  required
                />
              </FormGroup>
              <FormRow>
                <FormGroup>
                  <Label required>취득일</Label>
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
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>자격증 번호</Label>
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
              </FormRow>
              <DeleteButton
                onClick={() => handleDeleteItem("certificates", index)}
              >
                <FaTrash /> 삭제
              </DeleteButton>
            </ExperienceItem>
          ))}
        </Section>

        <SubmitButton type="submit">이력서 저장하기</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default ResumeForm;
