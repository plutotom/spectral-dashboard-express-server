const { Client } = require("@notionhq/client");
require("dotenv").config();

const getNotionUsers = async (req, res) => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  });
  const data = await notion.users.list();
  res.json(data);
};

const getNotionDashboard = async (req, res) => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  });

  const page = await notion.pages.retrieve({
    page_id: process.env.NOTION_DASHBOARD_PAGE,
  });

  const blockData = await notion.blocks.children.list({
    block_id: page.id,
  });

  let children = blockData.results.filter((block) => block.has_children);
  children = children.map((child) => child.id);

  const childrenData = await Promise.all(
    children.map((child) => notion.blocks.children.list({ block_id: child }))
  );

  childrenData.forEach((child) => {
    blockData.results = blockData.results.concat(child.results);
  });

  console.log(children);
  res.json(blockData);
};

module.exports = {
  getNotionUsers,
  getNotionDashboard,
};
