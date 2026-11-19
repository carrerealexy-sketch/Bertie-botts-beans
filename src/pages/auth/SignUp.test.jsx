import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { AuthContext } from "../../contexts/AuthContext";
import { MemoryRouter } from "react-router";
import { ROUTES } from "../../constants";
import { SignUp } from "./Signup";
import userEvent from "@testing-library/user-event";

const { mockNavigate } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
}));

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("SignUp", () => {
  const signup = vi.fn();

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <AuthContext.Provider value={{ signup }}>
          <SignUp />
        </AuthContext.Provider>
      </MemoryRouter>,
    );
  };

  const fillForm = async (
    user,
    password = "password123",
    confirmPassword = password,
  ) => {
    await user.type(screen.getByLabelText("Nom d'utilisateur"), "Harry Potter");

    await user.type(screen.getByLabelText("Mot de passe"), password);

    await user.type(
      screen.getByLabelText("Confirmer le mot de passe"),
      confirmPassword,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the signup form", () => {
    renderComponent();

    expect(
      screen.getByRole("heading", { name: "Créer un compte" }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Nom d'utilisateur")).toBeInTheDocument();

    expect(screen.getByLabelText("Mot de passe")).toBeInTheDocument();

    expect(
      screen.getByLabelText("Confirmer le mot de passe"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Créer mon compte atelier" }),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Se connecter" })).toHaveAttribute(
      "href",
      ROUTES.AUTH.LOGIN,
    );
  });

  it("should not submit when fields are empty", async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.click(
      screen.getByRole("button", { name: "Créer mon compte atelier" }),
    );

    expect(signup).not.toHaveBeenCalled();
  });

  it("should not submit when passwords do not match", async () => {
    const user = userEvent.setup();

    renderComponent();

    await fillForm(user, "password123", "different123");

    await user.click(
      screen.getByRole("button", { name: "Créer mon compte atelier" }),
    );

    expect(signup).not.toHaveBeenCalled();
  });
});
