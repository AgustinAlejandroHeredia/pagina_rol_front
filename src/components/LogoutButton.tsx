import { useAuth0 } from "@auth0/auth0-react";

type LogoutButtonProps = {
  className?: string
}

const LogoutButton = ({ className = "" }: LogoutButtonProps) => {
  const { logout, isAuthenticated } = useAuth0();

  if (!isAuthenticated) return null;

  return (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: `${window.location.origin}/login` } })
      }
      className={`button logout ${className}`}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;