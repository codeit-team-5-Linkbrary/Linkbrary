import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import styles from "@/styles/LandingPage.module.css";

function LandingPage() {
  //테스트 코드
  const handleClick = () => {
    console.log(1);
  };

  return (
    <div>
      <Nav />
      <div className={styles.landingContents}>
        <div className={styles.header}>
          <h1>
            <span>세상의 모든 정보</span>를<br />
            쉽게 저장하고 관리해 보세요
          </h1>
          <Button type="LinkAdd" onClick={handleClick}>
            링크 추가하기
          </Button>
        </div>
        <div className={styles.contents}>
          <div className={styles.saveContent}>
            <h2>
              <span>원하는 링크</span>를<br />
              저장하세요
            </h2>
            <p>
              나중에 읽고 싶은 글, 다시 보고 싶은 영상, <br />
              사고 싶은 옷, 기억하고 싶은 모든 것을 <br /> 한 공간에 저장하세요.
            </p>
          </div>
          <div className={styles.managementContent}>
            <h2>
              링크를 폴더로 <br />
              <span>관리</span> 하세요
            </h2>
            <p>
              나만의 폴더를 무제한으로 만들고 <br />
              다양하게 활용할 수 있습니다.
            </p>
          </div>
          <div className={styles.shareContent}>
            <h2>
              저장한 링크를 <br />
              <span>공유</span>해 보세요.
            </h2>
            <p>
              여러 링크를 폴더에 담고 공유할 수 있습니다. <br />
              가족, 친구, 동료들에게 쉽고 빠르게 링크를 <br />
              공유해 보세요.
            </p>
          </div>
          <div className={styles.searchContent}>
            <h2>
              저장한 링크를 <span>검색</span>해 보세요
            </h2>
            <p>중요한 정보들을 검색으로 쉽게 찾아보세요.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
