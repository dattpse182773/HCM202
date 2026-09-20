const make=(id,title,category,good,detail)=>({id,title,category,good,detail});
export const zones=[
  {id:'root',name:'Rễ · Nội lực',icon:'🌱',hint:'Năng lực tự thân'},
  {id:'trunk',name:'Thân · Chủ quyền',icon:'🎋',hint:'Lợi ích quốc gia'},
  {id:'branch',name:'Cành · Hội nhập',icon:'🌏',hint:'Hợp tác quốc tế'}
];
const raw=[
 [['Canh tân giáo dục và kỹ nghệ','Bảo vệ chủ quyền, chủ động phòng thủ','Mở giao thương có chọn lọc'],['Bế quan tỏa cảng','Phụ thuộc hoàn toàn vào viện trợ','Nhượng bộ lợi ích cốt lõi']],
 [['Xây dựng lực lượng cách mạng trong nước','Kiên định mục tiêu độc lập dân tộc','Tranh thủ sự ủng hộ quốc tế'],['Sao chép mô hình nước ngoài','Tách rời phong trào thế giới','Chỉ chờ sự giúp đỡ bên ngoài']],
 [['Diệt giặc đói, giặc dốt','Giữ vững chính quyền cách mạng','Ngoại giao thêm bạn, bớt thù'],['Dồn hết nguồn lực cho một mặt','Từ bỏ nguyên tắc để đổi lấy công nhận','Không quan tâm đời sống nhân dân']],
 [['Củng cố hậu phương và sức dân','Giữ thành quả trên chiến trường','Kết hợp quân sự với đàm phán'],['Chỉ dùng sức mạnh quân sự','Ký thỏa thuận bất lợi để kết thúc sớm','Từ chối mọi kênh ngoại giao']],
 [['Khôi phục sản xuất và đời sống','Giữ vững thống nhất và an ninh','Tìm kiếm quan hệ hợp tác mới'],['Khép kín nền kinh tế lâu dài','Lệ thuộc một thị trường duy nhất','Xem nhẹ đời sống nhân dân']],
 [['Phát huy nội lực kinh tế trong nước','Giữ định hướng phát triển độc lập','Mở cửa, đa phương hóa quan hệ'],['Mở cửa không có lộ trình','Giữ nguyên cơ chế khép kín','Đánh đổi chủ quyền lấy tăng trưởng']],
 [['Nâng sức cạnh tranh doanh nghiệp Việt','Bảo vệ lợi ích quốc gia trong hợp tác','Chủ động tham gia ASEAN'],['Phó mặc thị trường trong nước','Liên minh phụ thuộc một phía','Tự cô lập khỏi khu vực']],
 [['Nâng chất lượng sản phẩm trong nước','Giữ không gian chính sách thiết yếu','Thực hiện cam kết WTO chủ động'],['Bảo hộ vĩnh viễn mọi ngành','Mở cửa không chuẩn bị','Để doanh nghiệp nước ngoài chi phối']],
 [['Củng cố nội lực quốc gia','Kiên định nguyên tắc, linh hoạt sách lược','Đa phương hóa, đa dạng hóa'],['Chọn phe cứng nhắc','Nhân nhượng lợi ích cốt lõi','Tránh mọi hợp tác quốc tế']],
 [['Đào tạo kỹ sư và năng lực R&D','Bảo vệ dữ liệu và công nghệ cốt lõi','Hợp tác và chuyển giao công nghệ'],['Miễn mọi điều kiện cho nhà đầu tư','Chỉ gia công, không học công nghệ','Đóng cửa với chuỗi cung ứng toàn cầu']]
];
export const policyDecks=raw.map((pair,turn)=>{
 const good=pair[0].map((title,i)=>make(`t${turn}-g${i}`,title,zones[i].id,true,'Giải pháp giúp giữ cân bằng giữa tự chủ và hội nhập.'));
 const bad=pair[1].map((title,i)=>make(`t${turn}-b${i}`,title,zones[(i+1)%3].id,false,'Lựa chọn cực đoan có thể làm suy yếu nội lực hoặc khả năng hội nhập.'));
 return [good[0],bad[1],good[2],bad[0],good[1],bad[2]];
});

export function evaluatePolicies(selection,deck){
 const picked=Object.entries(selection).map(([zone,id])=>({zone,card:deck.find(c=>c.id===id)}));
 const correct=picked.filter(x=>x.card?.good&&x.card.category===x.zone).length;
 const complete=picked.length===3&&picked.every(x=>x.card);
 return {complete,correct,points:complete?40+correct*20:0};
}
