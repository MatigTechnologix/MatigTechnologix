async function saveRecord(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const values = new FormData(event.currentTarget);

  const title = String(values.get("title") || "").trim();
  const detail = String(values.get("detail") || "").trim();
  const status = String(values.get("status") || "Draft");

  if (!title || !detail) return;

  // BLOG → DATABASE
  if (active === "Blog") {
    try {
      const isEditing = Boolean(editing?.id);

      const response = await fetch(
        isEditing ? `/api/blog/${editing!.id}` : "/api/blog",
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            slug: makeSlug(title),
            content: detail,
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setNotice(data.error || "Failed to save blog post");
        return;
      }

      const record: RecordItem = {
        id: data.id,
        title: data.title,
        detail: data.content,
        status: data.status,
        updated: blogDateLabel(data.updatedAt),
      };

      setStore((current) => ({
        ...current,
        Blog: isEditing
          ? (current.Blog || []).map((item) =>
              item.id === record.id ? record : item
            )
          : [record, ...(current.Blog || [])],
      }));

      setEditing(null);
      setNotice(
        isEditing
          ? "Blog updated in database"
          : "Blog saved to database"
      );

      return;
    } catch (error) {
      console.error(error);
      setNotice("Failed to connect to database");
      return;
    }
  }

  // OTHER MODULES → existing local storage behavior
  const record: RecordItem = {
    id:
      editing?.id ||
      `${active.toLowerCase().replace(/\s/g, "-")}-${Date.now()}`,
    title,
    detail,
    status,
    updated: dateLabel(),
  };

  setStore((current) => ({
    ...current,
    [active]: editing
      ? (current[active] || []).map((item) =>
          item.id === record.id ? record : item
        )
      : [record, ...(current[active] || [])],
  }));

  setEditing(null);
  setNotice(editing ? "Record updated" : "Record added");
}