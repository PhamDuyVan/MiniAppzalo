import React, { Suspense } from "react";
import { List, Page, Icon, useNavigate } from "zmp-ui";
import UserCard from "../components/user-card";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Page className="page">
      <Suspense>
        <div className="section-container">
          <UserCard />
        </div>
      </Suspense>
      <div className="section-container">
        <List>
          <List.Item
            onClick={() => navigate("/about")}
            suffix={<Icon icon="zi-arrow-right" />}
          >
            <div>Giới Thiệu</div>
          </List.Item>
          <List.Item
            onClick={() => navigate("/user")}
            suffix={<Icon icon="zi-arrow-right" />}
          >
            <div>Người dùng</div>
          </List.Item>
          <List.Item
  onClick={() => navigate("/chat")}
  suffix={<Icon icon="zi-arrow-right" />}
>
  <div>Chat hỗ trợ</div>
</List.Item>

        </List>
      </div>
    </Page>
  );
};

export default HomePage;
