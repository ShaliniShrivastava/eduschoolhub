import { GoogleLogin } from "@react-oauth/google";

export default function GoogleLoginButton({
  onCredential,
  onError,
  disabled = false,
}) {
  return (
    <div
      className={`flex min-h-10 justify-center ${
        disabled ? "pointer-events-none opacity-50" : ""
      }`}
    >
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (!credentialResponse.credential) {
            onError?.("Google did not return a valid credential.");
            return;
          }

          onCredential(credentialResponse.credential);
        }}
        onError={() => {
          onError?.("Google sign-in was cancelled or failed.");
        }}
        useOneTap={false}
        text="continue_with"
        shape="rectangular"
        size="large"
        width="320"
        theme="outline"
      />
    </div>
  );
}