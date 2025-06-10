export const formatDate = (dateString: string) => {
  if (!dateString) return null;
  // Nếu có GMT+07:00, chuyển thành định dạng ISO
  const isoString = dateString
    .replace(" GMT+07:00", "+07:00")
    .replace(" ", "T");
  return isoString;
};
