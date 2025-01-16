package utils


func ContainsStringArr(arr []string, tocheck string) bool {
    for _, row := range arr {
        if row == tocheck {
            return true
        }
    }
    return false
}  

func ContainsRuneArr(arr []rune, tocheck rune) bool {
    for _, row := range arr {
        if row == tocheck {
            return true
        }
    }
    return false
}

func GetRunesOfStringSlice(stringSlice []string) []rune {
    var runes []rune
    for _, elem := range stringSlice {
        for _, r := range elem{
            if !ContainsRuneArr(runes, r){
                runes = append(runes, r)
            } 
        }
    }
    return runes
}
