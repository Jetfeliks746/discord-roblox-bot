--Place this Script in ServerScriptService on Roblox Studio.

---------------------[ Configs ]----------------------------------------------------------
local URL = "" --Place the glitch project URL inside of the quotes

local groupId = 0 -- Place your group ID here
local minimumRankToUseCommands = 0 -- Place the minimum rank to use ranking commands here
-------[ End of Configs ]----------------------------------------------------------------------------------------

--------[ Commands for in-game ]------------------------------
--[[

!rank <username> <rankId>
!promote <username>
!demote <username>
!shout <message>

]]--

----------[ Script (DO NOT TOUCH UNLESS YOU KNOW WHAT YOU ARE DOING!) ]-----------------------------------------------------
function rankUser(UserId, RoleId)
	game:GetService("HttpService"):GetAsync(URL .. "ranker?userid=" .. UserId .. "&rank=" .. RoleId)
end

function promoteUser(UserId)
	game:GetService("HttpService"):GetAsync(URL .. "promote?userid=" .. UserId)
end

function demoteUser(UserId)
	game:GetService("HttpService"):GetAsync(URL .. "demote?userid=" .. UserId)
end

function Shout(msg)
	game:GetService("HttpService"):GetAsync(URL .. "shouts?shout=" .. msg)
end

local groupService = game:GetService("GroupService")
local groupInfo = groupService:GetGroupInfoAsync(groupId)

game.Players.PlayerAdded:Connect(function(Player)
	if Player:IsInGroup(groupId) and  Player:GetRankInGroup(groupId) >= minimumRankToUseCommands then
		Player.Chatted:Connect(function(Message)
			local LowerCaseMessage = string.lower(Message)
			if not string.find(LowerCaseMessage, "!rank") and not string.find(LowerCaseMessage, "!promote") and not string.find(LowerCaseMessage, "!demote") and not string.find(LowerCaseMessage, "!shout") then return end
			local SplitMessage = string.split(Message, " ")
			if string.find(LowerCaseMessage, "!shout") then
				local Msg = Message:gsub("!shout", "")
				Shout(Msg)
				end
			local PlayerToRank = game.Players[SplitMessage[2]]
			if Player:IsInGroup(groupId) and Player:GetRankInGroup(groupId) > PlayerToRank:GetRankInGroup(groupId) then
				if string.find(LowerCaseMessage, "!rank") then
					local RankId = SplitMessage[3]
					if (tonumber(RankId) < 254 and tonumber(RankId) >= 1) then
						rankUser(PlayerToRank.UserId, RankId)
						end
				elseif string.find(LowerCaseMessage, "!promote") then
					local PlayerCurrentRank = PlayerToRank:GetRankInGroup(groupId)
						promoteUser(PlayerToRank.UserId)
						print(PlayerCurrentRank)
				elseif string.find(LowerCaseMessage, "!demote") then
					local PlayerCurrentRank = PlayerToRank:GetRankInGroup(groupId)
						demoteUser(PlayerToRank.UserId)
						print(PlayerCurrentRank)
				end
				end
			end)
	end
end)

----------------------[ End of Script ]-------------------------------------------------------------------------------------------------------------------------------------
