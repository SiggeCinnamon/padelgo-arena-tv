import styles from "./NavBar.modules.scss";

export default function NavBar({ history }) {
    function goBack() {
        window.history.back();
      }
  return (
    <>
      <nav className={styles.navbar + " navbar"}>
        <p
          onClick={() => {
            goBack();
          }}
        >
          padelgo.tv - stream for free
        </p>
      </nav>
    </>
  );
}
