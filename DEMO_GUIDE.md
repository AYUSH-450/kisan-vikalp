# Kisan Vikalp - SIH Demo Guide

This document contains the exact sequence a presenter should follow during a Smart India Hackathon demonstration. The demonstration is designed to take approximately 5–7 minutes.

**Preparation**: Before the demo, ensure the environment is reset by navigating to the **Government Admin > Settings** and clicking the red **"Reset Demo State"** button.

---

## PART 1 — FARMER

1. **Open Kisan Vikalp Landing Page**.
2. **Select Farmer** from the Demo Role Selector.
3. **Show Farmer Home**.
4. Explain the upcoming procurement section (if empty, proceed to book).
5. Click **Book Procurement**.
6. Select **Paddy**.
7. Enter **30** (Quintals).
8. Show **Smart Centre Recommendation**.
9. Explain why **Centre B** is recommended (Lowest expected total time despite being farther away).
10. Select the recommended slot (**10:40 AM**).
11. Confirm booking.
12. Show **Digital Procurement Pass**.
13. Explain the secure PDF417 token: "This PDF417 barcode contains a secure transaction reference and does not contain Aadhaar or bank-account information."
14. Navigate back to Home, open **Live Queue**.
15. Show Token **A042** is active.
16. Show farmers ahead and estimated wait.
17. Open **"When Should I Leave?"** (Travel Plan).
18. Show travel time + safety buffer visualization.
19. Point out the recommended departure time (`11:01 AM`) and expected service time (`11:35 AM`).
20. Open map and trace the recommended route.

---

## PART 2 — OFFICER

1. **Open Officer Portal** from the main landing page.
2. Open **PDF417 Scanner**.
3. Verify transaction `TX938421` (simulate scan or click verify manually in demo).
4. Show farmer verification details (Ramesh Kumar, Paddy, 30 Q).
5. **Check in** the farmer.
6. Open **Live Queue** from the sidebar.
7. Show token **A042** moving up the queue.
8. Open the active transaction from the queue.
9. Perform **Quality Inspection**.
10. Click **Accept**.
11. Open **Weighing**.
12. Enter actual quantity: **29.6 Q**.
13. Confirm weight.
14. Click **Complete Procurement**.
15. Show the generated digital **Receipt**.

---

## PART 3 — FARMER

1. Return to the **Farmer Experience**.
2. Open the **Procurement Status** timeline.
3. Walk through the updated live tracking:
   - Checked In
   - Quality Inspection
   - Weighing
   - Procurement Completed
   - Payment Processing
4. Point out the final reconciled quantity: **29.6 Q**.
5. Explain the core value: *The farmer no longer needs to repeatedly visit the centre just to ask for status. Transparency is provided end-to-end.*

---

## PART 4 — GOVERNMENT ADMIN

1. Open **Government Command Centre**.
2. Show high-level **KPIs** (Farmers processed, Wait times, Capacity Utilisation).
3. Open **GIS Command Map**.
4. Select **Centre A** (Red marker).
5. Show high congestion metrics in the side panel.
6. Select **Centre B** (Green marker).
7. Show lower load metrics in the side panel.
8. Open **AI Demand Forecast**.
9. Show the 7-day predicted demand chart.
10. Highlight the specific capacity gap flagged by the AI.
11. Read out the **AI recommendation**: "Redirect 120 future bookings from District North (Centre A) toward District East (Centre B)."
12. Show the Load Balancing simulation visual.
13. Open **Operational Alerts**.
14. Acknowledge a 'Critical' alert to demonstrate interactive management.
15. Open **Reports**. Show the reporting interface and CSV export capabilities.

**Conclusion**: "This concludes the Kisan Vikalp end-to-end ecosystem demonstration."
