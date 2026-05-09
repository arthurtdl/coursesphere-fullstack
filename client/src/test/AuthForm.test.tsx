import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AuthForm } from "@/components";
import { useAuth } from "@/hooks/useAuth";
import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("@/hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("AuthForm", () => {
  const useAuthMock = vi.mocked(useAuth);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve chamar a função de login com os dados corretos", async () => {
    const mockLogin = vi.fn();

    useAuthMock.mockReturnValue({
      user: null,
      isAuthenticated: false,
      login: mockLogin,
      register: vi.fn(),
      logout: vi.fn(),
      loading: false,
    });

    render(<AuthForm />);

    const emailInput = screen.getByPlaceholderText(/exemplo@email.com/i);
    const passwordInput = screen.getByPlaceholderText(/••••••••/i);
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: "arthur@cin.ufpe.br" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "arthur@cin.ufpe.br",
        password: "password123",
      });
    });
  });

  it("deve mostrar o estado de loading no botão", () => {
    useAuthMock.mockReturnValue({
      user: null,
      isAuthenticated: false,
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
      loading: true,
    });

    render(<AuthForm />);
    
    const submitButton = screen.getByRole("button", { name: /entrar/i });
    expect(submitButton).toBeDisabled();
  });
});