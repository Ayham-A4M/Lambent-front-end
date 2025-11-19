import warriorStar from "../../../assets/badges/warrior-star.svg" 
import weekendWarrior from "../../../assets/badges/weekend-warrior.svg"
import knowledgeSeeker from "../../../assets/badges/knowledge-seeker.svg"
import academicAdventurer from "../../../assets/badges/academic-adventurer.svg"
import wisdomKeeper from "../../../assets/badges/wisdom-keeper.svg"
import habitFormer from "../../../assets/badges/habit-former.svg"
import legendaryStreak from "../../../assets/badges/legendary-streak.svg"
import teachingSage from "../../../assets/badges/teaching-sage.svg"


interface badges{
    [key:string]:string
}
export const badgesObj:badges={
    "warrior-star":warriorStar,
    "weekend-warrior":weekendWarrior,
    "knowledge-seeker":knowledgeSeeker,
    "academic-adventurer":academicAdventurer,
    "wisdom-keeper":wisdomKeeper,
    "habit-former":habitFormer,
    "teaching-sage":teachingSage,
    "legendary-streak":legendaryStreak

}