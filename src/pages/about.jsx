import React from "react";
import { Sheet, Button, Page, Text, useNavigate } from "zmp-ui";

const AboutPage = (props) => {
  const [actionSheetOpened, setActionSheetOpened] = React.useState(false);
  const navigate = useNavigate()
  return (
    <Page className="page">
      <div className="section-container">
        <Text>Chào mừng đến với Zalo Mini App</Text>
      </div>
      <div>
      <Button
        variant='secondary'
        fullWidth
        onClick={() => setActionSheetOpened(true)}
      >
        Quay lại
      </Button>
      </div>
      <Sheet.Actions
        visible={actionSheetOpened}
        onClose={() => setActionSheetOpened(false)}
        actions={[
          [
            {
              text: "Quay lại",
              onClick: () => {
                navigate(-1);
              },
            },
            {
              text: "Trang 1",
              close: true,
            },
            {
              text: "Trang 2",
              close: true,
            },
          ],
          [
            {
              text: "Thoát",
              close: true,
              danger: true,
            },
          ],
        ]}
      ></Sheet.Actions>
    </Page>
  );
};

export default AboutPage;