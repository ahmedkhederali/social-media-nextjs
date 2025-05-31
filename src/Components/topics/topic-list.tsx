import { getAllTopics } from "@/actions/get-all-topics";
import { Link } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import paths from "@/path";
export default async function TopicList() {
  const topics = await getAllTopics();

  if (topics.length === 0) {
    return <div>No topics available.</div>;
  }
  const renderedTopics = topics.map((topic) => (
    <div key={topic.id}>
      <Link href={paths.topicShow(topic.slug)}>
        <Chip color="primary" variant="flat" className="mr-2">
          {topic.slug}
        </Chip>
      </Link>
    </div>
  ));

  return <div className="flex flex-row gap-2 flex-wrap">{renderedTopics}</div>;
}
