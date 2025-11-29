## Pizza Store - Panupong Saisopon

โปรเจกต์ **Pizza Store** จัดทำขึ้นเพื่อเป็นผลงานส่งในรายวิชา  
**040223360 Full-Stack Web Programming 1 (2568)**

ระบบถูกออกแบบและพัฒนาในส่วนของ **Frontend** และ **Backend** โดยใช้เทคโนโลยีดังนี้:

- **Frontend:** HTML, CSS (TailwindCSS), React.js  
- **Backend:** TypeScript, Node.js, Nest.js

---

## ความสามารถของระบบ

### 👤 ผู้ใช้งาน (สมาชิก)
- สมัครสมาชิก, เข้าสู่ระบบ และเปลี่ยนรหัสผ่านได้
- เลือกสินค้าและเพิ่มลงตะกร้าได้
- สั่งซื้อสินค้า และตรวจสอบสถานะการจัดส่งได้

### 👨‍💼 พนักงาน (หลังบ้าน)
- เข้าถึงหน้า Dashboard สำหรับจัดการข้อมูลระบบ
- จัดการสถานะสมาชิกได้
- จัดการข้อมูลสินค้า และข้อมูลพนักงาน
- ตรวจสอบข้อมูลคำสั่งซื้อ และข้อมูลการจัดส่งได้

---

## 📌 ER Diagram

```mermaid
erDiagram

    members {
        char(12) Mem_Id PK
        varchar Name
        varchar Email
        varchar Phone
    }

    employees {
        int Emp_Id PK
        varchar Emp_Name
        varchar Emp_Email
    }

    categories {
        int Category_Id PK
        varchar Category_Name
    }

    products {
        int Product_Id PK
        varchar Product_Name
        decimal Price
        int Category_Id FK
        int Emp_Id FK
    }

    addresses {
        int Address_Id PK
        char(12) Mem_Id FK
        varchar Address_Text
        float Latitude
        float Longitude
    }

    carts {
        int Cart_Id PK
        char(12) Mem_Id FK
        int Address_Id FK
        datetime Cart_Sdate
        varchar Cart_Status
    }

    orders {
        int Order_Id PK
        int Cart_Id FK
        char(12) Mem_Id FK
        datetime Order_Date
        varchar Order_Status
    }

    order_details {
        int Order_Id FK
        int Product_Id FK
        int Quantity
        decimal Price
    }
    
    deliveries {
        int Delivery_Id PK
        int Order_Id FK
        char(15) Delivery_Number
        varchar Delivery_Status
    }

    %% RELATIONSHIPS
    members ||--o{ addresses : "has"
    members ||--o{ carts : "owns"
    members ||--o{ orders : "places"

    categories ||--o{ products : "has"

    employees ||--o{ products : "manages"

    products ||--o{ order_details : "included"

    carts ||--o{ orders : "generates"

    carts ||--o{ order_details : "contains"

    orders ||--o{ order_details : "contains"

    addresses ||--o{ carts : "delivery_to"

    orders ||--|| deliveries : "have"
