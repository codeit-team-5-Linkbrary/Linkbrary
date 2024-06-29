import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "./Modal";
import styles from "@/styles/Modal/ModalShare.module.css";

// 카카오톡
const loadKakaoSDK = (callback) => {
  if (typeof window !== "undefined" && !window.Kakao) {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.onload = () => {
      window.Kakao.init("3d3d577ff840e3f1997282941ba13827");
      callback();
    };
    document.head.appendChild(script);
  } else if (window.Kakao) {
    callback();
  }
};

const ModalShare = ({ onClose, folderName }) => {
  const [isKakaoReady, setIsKakaoReady] = useState(false);

  useEffect(() => {
    loadKakaoSDK(() => {
      setIsKakaoReady(true);
    });
  }, []);

  const shareOnKakao = () => {
    if (isKakaoReady && window.Kakao) {
      window.Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: `${folderName} 폴더 공유`,
          description: "지금 바로 폴더에서 링크를 확인해보세요!",
          imageUrl: "https://ifh.cc/g/9qfYVV.jpg",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: "웹으로 보기",
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    } else {
      alert("카카오톡 SDK가 로드되지 않았습니다.");
    }
  };

  // 페이스북
  const shareOnFacebook = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(facebookShareUrl, "_blank");
  };

  // 링크복사
  const copyLinkToClipboard = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert("링크가 복사되었습니다.");
      })
      .catch((err) => {
        console.error("링크 복사에 실패했습니다.", err);
      });
  };

  return (
    <Modal title="폴더 공유" onClose={onClose}>
      <div className={styles.folderName}>{folderName}</div>
      <div className={styles.iconBox}>
        <div className={styles.icon} onClick={shareOnKakao}>
          <Image
            src="/asset/colorKakao.svg"
            alt="카카오톡"
            width={42}
            height={42}
          />
          <div>카카오톡</div>
        </div>
        <div className={styles.icon} onClick={shareOnFacebook}>
          <Image
            src="/asset/colorFacebook.svg"
            alt="페이스북"
            width={42}
            height={42}
          />
          <div>페이스북</div>
        </div>
        <div className={styles.icon} onClick={copyLinkToClipboard}>
          <div className={styles.linkCopy}>
            <Image
              src="/asset/LoadLink.svg"
              alt="링크 복사"
              width={18}
              height={18}
            />
          </div>
          <div>링크 복사</div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalShare;
