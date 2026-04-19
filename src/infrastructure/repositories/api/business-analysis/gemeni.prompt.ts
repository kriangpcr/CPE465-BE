import { BusinessIdeaDto } from '@domain/repositories/api/businessanalysis.interface';

export const GEMINI_PROMPT = (data: BusinessIdeaDto) => {

  const normalized = {
    businessName: data.businessName || "ไม่ระบุชื่อธุรกิจ",
    IdeaDetail: data.IdeaDetail || "ไม่ระบุรายละเอียดไอเดีย",
    budget: data.budget ?? 50000, 
    location: data.location || "ไม่ระบุ (สมมติเป็นเขตเมืองทั่วไปในประเทศไทย)",
    targetAudience:
      data.targetAudience ||
      "ไม่ระบุกลุ่มเป้าหมาย (ให้วิเคราะห์จากพฤติกรรมผู้บริโภคไทยทั่วไป)",
    salesChannel: data.salesChannel || "both", // default = hybrid (realistic สุด)
  };


  return `คุณคือผู้เชี่ยวชาญด้าน Business Strategy, Food Industry Consultant และ Startup Advisor ที่มีประสบการณ์ในตลาดประเทศไทย

วิเคราะห์ไอเดียธุรกิจอาหารต่อไปนี้อย่างลึกซึ้ง รอบด้าน และสมจริง:

ชื่อธุรกิจ: "${data.businessName}"
รายละเอียดไอเดีย: "${data.IdeaDetail}"
งบประมาณ: ${data.budget} บาท
ทำเล: "${data.location}"
กลุ่มเป้าหมาย: "${data.targetAudience}"
ช่องทางขาย: "${data.salesChannel}" (online = ออนไลน์อย่างเดียว / onsite = หน้าร้านอย่างเดียว / both = ทั้งสองช่องทาง)

ให้วิเคราะห์โดยอิงบริบทประเทศไทยเท่านั้น และต้องใช้ข้อมูลเชิงเศรษฐกิจ สังคม และพฤติกรรมผู้บริโภคจริงประกอบ

ปัจจัยที่ต้องใช้ในการประเมิน (ต้องสะท้อนใน score และคำตอบ):

1. พฤติกรรมผู้บริโภคไทย (Consumer Behavior)
   - ความถี่ในการกินอาหารนอกบ้าน / เดลิเวอรี่
   - ความอ่อนไหวด้านราคา
   - ความนิยม convenience vs quality
   - ความเชื่อเรื่องสุขภาพ / อาหารปลอดภัย

2. Gold Standard Mental ของผู้บริโภคไทย
   - ความสะอาด (Food Hygiene)
   - ความปลอดภัย (Food Safety / อย.)
   - ความคุ้มค่า (Value for money)
   - รสชาติ (Taste localization)
   - ความน่าเชื่อถือของแบรนด์

3. บริบทเศรษฐกิจ (Economic Context)
   - GDP ไทยและกำลังซื้อของประชากร
   - ความเหลื่อมล้ำรายได้
   - ต้นทุนวัตถุดิบในประเทศ
   - ค่าแรงขั้นต่ำ / ค่าเช่า
   - ความเหมาะสมของงบประมาณที่มีกับแผนธุรกิจ

4. บริบททางสังคม (Social Trends)
   - Urbanization (คนเมือง)
   - Aging Society (ผู้สูงอายุ)
   - Working Class / มนุษย์เงินเดือน
   - ครอบครัวเดี่ยว vs ครอบครัวใหญ่

5. บริบทวัฒนธรรมไทย (Cultural Context)
   - รสนิยมอาหารไทย (จัดจ้าน / หวาน / มัน)
   - การกินร่วมกัน (sharing culture)
   - เทศกาล (สงกรานต์ / Ramadan / Vegetarian Festival)
   - ความเชื่อเรื่องอาหาร (มงคล / สุขภาพ / ฮาลาล)

6. ศาสนา เชื้อชาติ และข้อจำกัดอาหาร
   - Muslim (Halal)
   - Buddhist (บางช่วงกินเจ)
   - Chinese-Thai food preference
   - ความเสี่ยง mismatch เช่น "หมู" กับกลุ่มมุสลิม

7. การแบ่งกลุ่มผู้บริโภค (Segmentation) — วิเคราะห์แยก Gen Z / Gen Y / Gen X / Baby Boomers
   - พฤติกรรมการกิน, กำลังซื้อ, ความคาดหวังสินค้า

8. การแข่งขันในตลาดอาหารไทย
   - Street food vs Franchise vs Cloud kitchen
   - Barrier to entry
   - Differentiation จริงหรือไม่

9. ความเป็นไปได้ด้านต้นทุนและกำไร (คำนวณจากงบประมาณ ${data.budget} บาท)
   - Food cost %
   - Margin จริงในไทย
   - Scalability

10. กฎหมายและมาตรฐาน
    - อย., GMP / HACCP, ใบอนุญาตร้านอาหาร, ภาษี, Halal Certification

11. Supply Chain ในประเทศไทย
    - แหล่งวัตถุดิบ (local vs import)
    - ความเสถียรของราคา
    - Logistics / Cold chain

12. ความเสี่ยง
    - Food poisoning, Brand reputation, Social media backlash, Regulatory risk

เงื่อนไขการให้ score (สำคัญมาก):
- score ต้องสะท้อน "ความเป็นไปได้จริงในไทย"
- ห้าม bias optimistic
- ต้อง penalize ทันทีหาก:
  - ขัดกับศาสนา / วัฒนธรรม
  - งบประมาณไม่สอดคล้องกับแผน
  - ต้นทุนสูงแต่ราคาขายต่ำ
  - ไม่ตอบโจทย์พฤติกรรมคนไทย
- ต้องมีเหตุผลเชิงระบบ (ไม่ใช่ความรู้สึก)

การคำนวณ channels (สำคัญ):
- ให้ AI "แนะนำสัดส่วนที่เหมาะสมที่สุด" ระหว่าง online และ onsite (%)
- ต้องรวมกันได้ 100 เสมอ
- พิจารณาจาก:
  - ประเภทธุรกิจอาหาร (เช่น street food, premium, niche)
  - พฤติกรรมผู้บริโภคไทย (delivery vs dine-in)
  - ทำเล location (เมือง / ชานเมือง / tourist / community)
  - กลุ่มเป้าหมาย (วัยทำงาน / นักเรียน / ครอบครัว)
- ห้าม default 50/50 ถ้าไม่มีเหตุผลรองรับ
- ต้องมีเหตุผลรองรับใน reasonForScore

การคำนวณ gdpMetrics:
- gpAfterCommission: กำไรสุทธิโดยประมาณต่อเดือน (บาท) หลังหักค่า GP/commission แพลตฟอร์ม — อิงจากงบประมาณ ${data.budget} บาท
- marketValue: ขนาดตลาดโดยประมาณของกลุ่มสินค้านี้ในไทย (บาท/ปี)
- growthRate: อัตราการเติบโตของตลาด (เช่น "12.5%")
- projectedGmv: ยอดขายรวมที่คาดการณ์ใน 12 เดือนแรก (บาท)

รูปแบบ JSON ที่ต้องตอบ (ห้ามเปลี่ยน key ใดๆ):

{
  "score": number,
  "status": string,
  "channels": {
    "online": number,
    "onsite": number
  },
  "reasonForScore": [
    {
      "title": string,
      "detail": string,
      "severity": "High" | "Medium" | "Low"
    }
  ],
  "strategies": [
    {
      "id": string,
      "title": string,
      "detail": string
    }
  ],
  "locations": [
    {
      "area": string,
      "style": string,
      "why": string
    }
  ],
  "gdpMetrics": {
    "gpAfterCommission": number,
    "marketValue": number,
    "growthRate": string,
    "projectedGmv": number
  },
  "bmc": {
    "partners": string[],
    "activities": string[],
    "resources": string[],
    "valueProps": string[],
    "relationships": string[],
    "channels": string[],
    "segments": string[],
    "costs": string[],
    "revenues": string[]
  }
}

ข้อกำหนด:
- ตอบเป็น JSON object เท่านั้น ห้ามมีข้อความอื่น
- ตอบเป็นภาษาไทยทุก field (ยกเว้น severity ใช้ High/Medium/Low)
- status ต้องสะท้อน score เช่น "ระดับดีมาก (Excellent)" / "ระดับดี (Good Potential)" / "ระดับปานกลาง (Moderate)" / "ระดับต่ำ (High Risk)"
- reasonForScore ต้องมีอย่างน้อย 3 รายการ
- strategies ต้องมีพอดี 3 รายการ, id เป็น "01" "02" "03", ต้อง actionable จริงในไทย
- locations ต้องมี 3 รายการ — เลือกจากทำเลใกล้เคียงกับ "${data.location}" หรือเหมาะสมกับกลุ่มเป้าหมาย
- bmc ทุก key ต้องมีอย่างน้อย 4 รายการอธิบายให้ชัดเจนและสอดคล้องกับไอเดียธุรกิจ
- channels.online + channels.onsite ต้องรวมกันได้ 100 เสมอ
`;
};
