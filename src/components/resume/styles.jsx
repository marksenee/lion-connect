import styled from "styled-components";
import { theme } from "../../styles/theme";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} 0;
`;

export const Section = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid ${theme.colors.border};
  margin-bottom: ${theme.spacing.xl};

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.md};
  border-bottom: 2px solid ${theme.colors.lightGray};
`;

export const SectionTitle = styled.h3`
  font-size: 1.5rem;
  color: ${theme.colors.primary};
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

export const AddButton = styled.button`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-weight: 500;

  &:hover {
    background-color: ${theme.colors.secondary};
    transform: translateY(-1px);
  }
`;

export const DeleteButton = styled.button`
  background-color: transparent;
  color: ${theme.colors.gray};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 0.9rem;

  &:hover {
    background-color: #ff4444;
    color: ${theme.colors.white};
    border-color: #ff4444;
  }
`;

export const ExperienceItem = styled.div`
  background-color: ${theme.colors.lightGray};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
  position: relative;
  transition: all 0.3s ease;
  border: 1px solid ${theme.colors.border};

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};
  position: relative;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: ${theme.spacing.xs};
  color: ${theme.colors.gray};
  font-weight: 500;
  font-size: 0.9rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.body.fontSize};
  transition: all 0.3s ease;
  background-color: ${theme.colors.white};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(255, 119, 16, 0.1);
  }

  &[type="checkbox"] {
    width: auto;
    margin-right: ${theme.spacing.sm};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.body.fontSize};
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  background-color: ${theme.colors.white};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(255, 119, 16, 0.1);
  }
`;

export const SubmitButton = styled.button`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  border: none;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: ${theme.spacing.xl};

  &:hover {
    background-color: ${theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  color: ${theme.colors.gray};
  font-size: 0.9rem;
  padding: ${theme.spacing.sm} 0;
`;

export const FileInputContainer = styled.div`
  position: relative;
  margin-top: ${theme.spacing.sm};
`;

export const FileInputLabel = styled.label`
  display: inline-block;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background-color: ${theme.colors.lightGray};
  color: ${theme.colors.gray};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  width: 100%;
  border: 2px dashed ${theme.colors.border};

  &:hover {
    background-color: ${theme.colors.border};
    border-color: ${theme.colors.primary};
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileName = styled.div`
  margin-top: ${theme.spacing.xs};
  font-size: 0.9rem;
  color: ${theme.colors.gray};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background-color: ${theme.colors.lightGray};
  border-radius: ${theme.borderRadius.sm};
`;

export const SectionDescription = styled.p`
  color: ${theme.colors.gray};
  font-size: 0.9rem;
  margin-top: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.lg};
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
