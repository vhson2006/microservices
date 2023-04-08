import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PageHeader, SeoHead } from "../../commons/headers";
import { ErrorMessage } from "../../commons/messages/ErrorMessage";
import { common } from "../../configs/consts";
import { PublicAccess } from "../../modules";
import { wrapper } from "../../redux/wrapper";
import { getBlog } from "../../utils/api";
import { Box, Container, Flex } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { AccentFooterContainer } from "../../containers/footer/AccentFooterContainer";
import { AccentMenuContainer } from "../../containers/menu/AccentMenuContainer";
import parse from "html-react-parser";
import "react-quill/dist/quill.snow.css";

const DetailNewPage = (props: any) => {
  const { isServer, data: initialData } = props;
  const [data, setData]: any = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation("common");

  useEffect(() => {
    const fetchDetailNew = async (id: any) => {
      const { status, data } = await getBlog(id);
      if (status === common.CORRECT) {
        if (data.status === common.CORRECT) {
          setData(data.data);
        } else {
          setMessage(data.message);
        }
      }
    };
    if (!isServer) {
      fetchDetailNew(id);
    } else {
      setData(initialData);
    }
  }, []);

  if (message) return <ErrorMessage message={message} />;
  if (!data) return null;

  return (
    <PublicAccess>
      <SeoHead title={data.title} description={t("seo#description")} />
      <Flex direction="column" flex="1">
        <AccentMenuContainer />
        <Box className="ql-editor" mb="50" pb="50">
          <Container>
            <PageHeader title={data.title} description="" />
            {parse(data.content)}
          </Container>
        </Box>
        <AccentFooterContainer />
      </Flex>
    </PublicAccess>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params, query }: any) => {
      const isServer = !req.url.startsWith("/_next");
      const { id } = params;
      let initialData = null;
      if (isServer) {
        const { status, data } = await getBlog(id);
        if (status === common.CORRECT) {
          if (data.status === common.CORRECT) {
            initialData = data.data;
          }
        }
      }

      return {
        props: {
          isServer,
          data: initialData,
        },
      };
    }
);

export default DetailNewPage;
