using AutoMapper;
using Domain.DTOs;
using Domain.Entities;
using Domain.Entities.Junctions;
using Domain.Entities.Profiles;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Activity, Activity>();

        CreateMap<Activity, ActivityDto>()
            .ForMember(
                d => d.HostUsername, 
                o => o.MapFrom(s =>
                    s.Attendees.FirstOrDefault(a => a.IsHost)!.User.UserName)
            );
        
        CreateMap<ActivityAttendee, AttendeeDto>()
            .ForMember(d => d.DisplayName, 
                o => o.MapFrom(s =>
                    s.User.DisplayName)
            )
            .ForMember(d => d.Username, 
                o => o.MapFrom(s =>
                    s.User.UserName)
            )
            .ForMember(d => d.Biography, 
                o => o.MapFrom(s =>
                    s.User.Biography)
            )
            .ForMember(d => d.ImageUri, 
                o => o.MapFrom(s =>
                    s.User.Images.FirstOrDefault(i => i.IsMain)!.Uri)
            );

        CreateMap<User, UserProfile>()
            .ForMember(d => d.ImageUri, 
                o => o.MapFrom(s =>
                s.Images.FirstOrDefault(i => i.IsMain)!.Uri)
            )
            .ForMember(d => d.FollowersCount, 
                o => o.MapFrom(s =>
                    s.Followers.Count)
            )
            .ForMember(d => d.FollowingCount, 
                o => o.MapFrom(s =>
                    s.Followings.Count)
            );

        CreateMap<ActivityAttendee, UserActivityDto>()
            .ForMember(d => d.Id, 
                o => o.MapFrom(s =>
                    s.Activity.Id)
            )
            .ForMember(d => d.Title, 
                o => o.MapFrom(s =>
                    s.Activity.Title)
            )
            .ForMember(d => d.Date, 
                o => o.MapFrom(s =>
                    s.Activity.Date)
            )
            .ForMember(d => d.Category, 
                o => o.MapFrom(s =>
                    s.Activity.Category)
            )
            .ForMember(d => d.HostUsername, 
                o => o.MapFrom(s =>
                    s.Activity.Attendees.FirstOrDefault(aa => aa.IsHost)!.User.UserName)
            );
    }
}